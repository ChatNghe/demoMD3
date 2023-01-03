const http = require('http');
const url = require('url')
const router = require('./controller/router')
const notFound = require('./controller/handleRouter/notFound')
const http1 = require("http");
const fs = require("fs");
// const server = http.createServer((req, res) => {
//     let pathName = url.parse(req.url, true).pathname;
//     const arrPath = pathName.split('/');
//     const trimPath = arrPath[arrPath.length - 1];
//     let chosenHandle;
//     if (typeof router[trimPath] === 'undefined') {
//         chosenHandle = notFound.handleNotFound;
//     } else {
//         chosenHandle = router[trimPath];
//     }
//     chosenHandle(req, res);
// })
//
// server.listen(8080, () => {
//     console.log('Server is running')
// })
const typeFile = {
    'jpg': 'images/jpg',
    'png': 'images/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'ttf': 'font/tff',
    'woff': 'font/woff',
    'woff2': 'font/woff',
    'eot': 'application/vnd.ms-fontobject'
}

const server = http1.createServer((req1, res) => {
    let pathName = url.parse(req1.url, true).pathname;
    const checkPath = pathName.match(/\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/);
    if (checkPath) {
        const contentType = typeFile[checkPath[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': contentType});
        fs.createReadStream(__dirname + req1.url).pipe(res);
    }else {
        const arrPath1 = pathName.split('/')
        // console.log('arrPath1', arrPath1)
        let trimPath = '';
        let id = '';
        if(arrPath1.length === 2){
            trimPath = arrPath1[arrPath1.length - 1];
        }else {
            trimPath = arrPath1[arrPath1.length - 2]
            id = arrPath1[arrPath1.length - 1]
        }
        // console.log(trimPath,id)

        let chosenHandle;
        if (typeof router[trimPath] === 'undefined') {
            chosenHandle = notFound.handleNotFound;
        } else {
            chosenHandle = router[trimPath];
        }
        chosenHandle(req1, res, id);
    }
})
server.listen(8080, () => {
    console.log('Server is running')
})