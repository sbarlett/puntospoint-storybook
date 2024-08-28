const fs = require('fs');
const path = require('path');
let files = [];

const filePath = './src/index.tsx';

const getFilesRecursively = directory => {
    const filesInDirectory = fs.readdirSync(directory);
    for (const file of filesInDirectory) {
        const absolute = path.join(directory, file);
        if (fs.statSync(absolute).isDirectory()) {
            getFilesRecursively(absolute);
        } else if (absolute !== filePath.replace('./', '').split('/').join('\\')) {
            files.push(absolute);
        }
    }
};
getFilesRecursively('./src/');

let components = files
    .map(path => {
        if (path.endsWith('index.tsx')) return path;
    })
    .filter(path => path)
    .map(path => path.replace('src', '.').split('\\').join('/').replace('/index.tsx', ''));
try {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
} catch (err) {
    console.error(err);
}

let counter = 0;

components.map(componentPath => {
    counter++;
    fs.writeFile(
        filePath,
        `export {default as ${componentPath.replace('./', '').split('/').join('_')}} from "${componentPath}";\n`,
        {flag: 'a'},
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
});

console.log(`Exported ${counter} components`);
