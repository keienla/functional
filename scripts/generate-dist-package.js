const fs = require('fs');
const path = require('path');

// Paths
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');
const packageJsonPath = path.join(rootDir, 'package.json');
const distPackageJsonPath = path.join(distDir, 'package.json');

// Read the original package.json
const originalPackage = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get all function directories for exports
const functionDirs = fs.readdirSync(srcDir).filter((dir) => {
    const dirPath = path.join(srcDir, dir);
    return (
        fs.statSync(dirPath).isDirectory() &&
        !dir.startsWith('_') &&
        dir !== 'models' &&
        dir !== 'utils'
    );
});

// Generate exports object
const packageExports = {
    '.': {
        import: './esm/index.js',
        require: './cjs/index.js',
        types: './cjs/index.d.ts',
    },
};

// Add exports for each function
functionDirs.forEach((dir) => {
    packageExports[`./${dir}`] = {
        import: `./esm/${dir}/${dir}.js`,
        require: `./cjs/${dir}/${dir}.js`,
        types: `./cjs/${dir}/${dir}.d.ts`,
    };
});

// Create the dist package.json
const distPackage = {
    ...originalPackage,
    // Update paths to be relative to dist folder
    main: 'cjs/index.js',
    module: 'esm/index.js',
    types: 'cjs/index.d.ts',
    // Add all the exports
    exports: packageExports,
    // Update files to only include built files
    files: ['cjs/**/*', 'esm/**/*', 'README.md', 'LICENSE', 'docs/**/*'],
    // Remove dev dependencies and scripts that don't make sense in dist
    devDependencies: undefined,
    scripts: {
        // Keep only relevant scripts
        ...(originalPackage.scripts.test && {
            test: originalPackage.scripts.test,
        }),
    },
};

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Write the dist package.json
fs.writeFileSync(distPackageJsonPath, JSON.stringify(distPackage, null, 2));

// Copy LICENSE && README.md to dist
const toMoveFiles = [
    { src: 'LICENSE', dest: 'LICENSE' },
    { src: 'README.md', dest: 'README.md' },
];

toMoveFiles.forEach(({ src, dest }) => {
    const srcPath = path.join(rootDir, src);
    const destPath = path.join(distDir, dest);

    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied ${src} to dist/`);
    } else {
        console.log(`⚠️  ${src} not found, skipping copy`);
    }
});

console.log(
    `✅ Generated dist/package.json with ${functionDirs.length} function exports`,
);
console.log(`📦 Functions: ${functionDirs.join(', ')}`);
console.log(`📍 Package ready for publishing from dist/ folder`);
