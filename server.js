const http = require('http');

// Array of Data 
const todos = [
    { id: 1, text: 'Todo One'},
    { id: 2, text: 'Todo Two'},
    { id: 3, text: 'Todo Three'}
]


const server = http.createServer((req, res) => {

    const { method, url, } = req;

    let body = [];
    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body);

        let status = 404;
        const response = {
            success: false,
            data: null,
            error: null 
        }

        if (method === 'GET' && url === '/todos') {
            status = 200;
            response.success = true;
            response.data = todos;
        } else if(method === 'POST' && url === '/todos') {
            const  { id, text } = JSON.parse(body);

            if (!id || !text) {
                status == 400;
                response.error = 'please add id and text';
            } else {
                todos.push({ id, text });
                response.success = true;
                response.data = todos;
            }
        }

        res.writeHead(404, {
            'Content-Type': 'application/json',
            'X-Powered-by': 'Node.js'
        });

        res.end(
            JSON.stringify(response)
        );
    });
});


const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

