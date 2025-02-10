const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        //  Handle GET request
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome! This is a GET request.');
    
    } else if (req.method === 'POST' && req.url === '/data') {
        //  Handle POST request
        let body = ''; // empty body to collect small chunks of data

        req.on('data', (chunk) => {
            console.log(chunk);
            body += chunk.toString(); // Convert Buffer to string
            console.log(body);
        });

        req.on('end', () => {
            const receivedData = JSON.parse(body); // Parse JSON data
            res.writeHead(200, { 'Content-Type': 'application/json' });
            console.log("request received")
            res.end(JSON.stringify({ message: 'POST request received', data: receivedData }));
        });

    } else {
        //  Handle unknown routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}/`);
});
