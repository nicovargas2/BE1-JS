import http from 'http'

const PORT = 8080;

const server = http.createServer((req, res) => {
    res.end('hola mundo!');
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})