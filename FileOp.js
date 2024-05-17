const fs = require('fs');
const [,, operation, filePath, content] = process.argv;
switch (operation) {
    case 'read':
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
        break;

    case 'append':
        fs.appendFile(filePath, content + '\n', (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Content appended to the file '${filePath}'`);
            }
        });
        break;

    case 'delete':
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`File '${filePath}' deleted`);
            }
        });
        break;

    case 'create':
        fs.writeFile(filePath, '', (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`File '${filePath}' created`);
            }
        });
        break;

    case 'rename':
        const newFileName = content;
        fs.rename(filePath, newFileName, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`File '${filePath}' renamed to '${newFileName}'`);
            }
        });
        break;

    case 'list':
        const dirPath = filePath || '.';
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                console.error(err);
            } else {
               console.log(files);
            }
        });
        break;

    default:
        console.log(`Invalid operation '${operation}'`);
}

