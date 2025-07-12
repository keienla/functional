const fs = require('fs');
const { exec } = require('child_process');

const DIST_FOLDER = './dist';

console.log('📦 Starting deployment process...');

// Check if dist folder exists (should be created by build process)
if (!fs.existsSync(DIST_FOLDER)) {
    console.error('❌ Dist folder not found. Please run "npm run build" first.');
    process.exit(1);
}

// Check if package.json exists in dist
if (!fs.existsSync(`${DIST_FOLDER}/package.json`)) {
    console.error('❌ package.json not found in dist. Please run "npm run build" first.');
    process.exit(1);
}

console.log('✅ Build files verified');

// Copy additional files
const filesToMove = ['LICENSE', 'README.md'];

filesToMove.forEach((file) => {
    if (fs.existsSync(`./${file}`)) {
        console.log(`📄 Copying ${file}...`);
        fs.copyFileSync(`./${file}`, `${DIST_FOLDER}/${file}`);
    }
});

console.log('📍 Deployment preparation complete!');
console.log('🚀 You can now publish from the dist/ folder');
console.log('💡 To publish: cd dist && npm publish');
