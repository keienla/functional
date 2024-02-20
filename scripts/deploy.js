const fs = require('fs')
const ts = require('typescript')
const { exec } = require('child_process');
const package = require('./../package.json')

const DIST_FOLDER = './dist'

if(fs.existsSync(DIST_FOLDER)) {
    console.log(`-> Remove existing ${DIST_FOLDER}`)
    fs.rmSync(DIST_FOLDER, {recursive: true, force: true})
}

console.log('-> compile TS start')
console.time('-> compile TS End')
exec('tsc --build', (err, stdout, stderr) => {
    console.timeEnd('-> compile TS End')
    if(err) throw err

    console.log('-> update and move package.json')
    const newPackage = {...package}
    newPackage.main = './functional.js'
    newPackage.types = './functional.d.ts'
    newPackage.scripts = {}
    newPackage.files = ['**/*']

    fs.appendFileSync(DIST_FOLDER + '/package.json', JSON.stringify(newPackage))

    const filesToMove = ['LICENSE', 'README.md']

    filesToMove.forEach(file => {
        console.log('-> move ' + file)
        fs.copyFileSync('./' + file, DIST_FOLDER + '/' + file)
    })
})