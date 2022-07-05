// Create a web server that's going to send a response of big image to any client
// that sends a request to your specified server:port. (Try to solve this in many different ways)

const http = require('http');
const fs = require('fs');
const path = require('path');

// 1: read file sync
http.createServer((req, res) => {
    try {
        let html = fs.readFileSync('./dog.jpeg');
        res.end(html);
    } catch (e) {
        console.log(e);
    }
}).listen(9000);

// 2: use stream
http.createServer().on('request', (req, res) => {
    const src = fs.createReadStream('./dog2.jpeg');
    src.pipe(res);
}).listen(8000);

// 3: read file async
http.createServer((req, res) => {
    fs.readFile('./dog3.jpeg', (err, data) => {
        if (err) throw err;
        res.end(data);
    });
}).listen(3000);