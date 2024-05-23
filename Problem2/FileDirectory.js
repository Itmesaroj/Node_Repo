const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url);
    const filePath = path.join(__dirname, url);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.end('404 Not Found');
            return;
        }
        if (stats.isDirectory()) {
            fs.readdir(filePath, (err, paths) => {
                if (err) {
                    res.end('Internal Server Error');
                    return;
                }

                const html = `<ul>${paths.map((item) => {
                    const dirPath = path.join(filePath, item);
                    const dirfile = path.join(url, item);

                    const stats = fs.statSync(dirPath);
                    if (stats.isDirectory()) {
                        return `<li><a href="${dirfile}/">📁 ${item}</a></li>`;
                    }
                    return `<li><a href="${dirfile}">📄 ${item}</a></li>`;
                }).join('')}</ul>`;

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            });
        } else {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.end('Internal Server Error');
                    return;
                }
                res.end(data);
            });
        }
    });
});

server.listen(4080, () => {
    console.log("server listening");
});
