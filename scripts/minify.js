const fs = require('fs');
const path = require('path');
// Use esbuild-wasm for cross-platform compatibility
let esbuild;
let isWasm = false;

async function initializeEsbuild() {
    try {
        esbuild = require('esbuild');
        console.log('📦 Using native esbuild');
    } catch (error) {
        console.log('📦 esbuild native not available, using esbuild-wasm...');
        esbuild = require('esbuild-wasm');
        await esbuild.initialize();
        isWasm = true;
        console.log('✅ esbuild-wasm initialized');
    }
}

// Get target directory from command line args
const targetDir = process.argv[2];

if (!targetDir) {
    console.error('❌ Please specify target directory (cjs or esm)');
    console.error('Usage: node scripts/minify.js <cjs|esm>');
    process.exit(1);
}

const distPath = path.join(__dirname, '..', 'dist', targetDir);

if (!fs.existsSync(distPath)) {
    console.error(`❌ Directory ${distPath} does not exist`);
    process.exit(1);
}

console.log(`🗜️  Minifying ${targetDir.toUpperCase()} files...`);

// Function to get all .js files recursively
function getAllJsFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getAllJsFiles(filePath, fileList);
        } else if (file.endsWith('.js') && !file.endsWith('.min.js')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Get all JS files
const jsFiles = getAllJsFiles(distPath);

if (jsFiles.length === 0) {
    console.log('⚠️  No JavaScript files found to minify');
    process.exit(0);
}

console.log(`📁 Found ${jsFiles.length} files to minify`);

// Main execution function
async function main() {
    await initializeEsbuild();
    
    // Minify each file
    let minifiedCount = 0;
    let errors = [];

    const minifyPromises = jsFiles.map(async (filePath) => {
        try {
            const result = await esbuild.build({
                entryPoints: [filePath],
                outfile: filePath, // Overwrite the original file
                minify: true,
                sourcemap: true, // Preserve sourcemaps
                target: 'es6',
                format: targetDir === 'esm' ? 'esm' : 'cjs',
                allowOverwrite: true,
                logLevel: 'error'
            });
            
            minifiedCount++;
            
            // Show progress for every 10 files
            if (minifiedCount % 10 === 0) {
                console.log(`  ✅ Minified ${minifiedCount}/${jsFiles.length} files...`);
            }
            
            return { success: true, file: filePath };
        } catch (error) {
            errors.push({ file: filePath, error: error.message });
            return { success: false, file: filePath, error };
        }
    });
    
    // Wait for all minification to complete
    const results = await Promise.all(minifyPromises);
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`\n✅ Minification complete for ${targetDir.toUpperCase()}:`);
    console.log(`  📦 ${successful} files minified successfully`);
    
    if (failed > 0) {
        console.log(`  ❌ ${failed} files failed:`);
        errors.forEach(err => {
            console.log(`    - ${path.relative(distPath, err.file)}: ${err.error}`);
        });
        process.exit(1);
    }
    
    // Calculate space savings
    console.log(`  🎯 All ${targetDir.toUpperCase()} files optimized for production`);
}

// Run the main function
main().catch(error => {
    console.error('❌ Minification failed:', error);
    process.exit(1);
});