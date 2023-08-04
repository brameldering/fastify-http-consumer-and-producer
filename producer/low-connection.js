const http = require("http");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3020;

const server = http.createServer((req, res) => {
  console.log("current conn", server._connections);
  setTimeout(() => res.end("OK"), 10_000);
});
server.maxConnections = 2;
server.listen(PORT, HOST, () => {
  console.log(`Producer running at http://${HOST}:${PORT}`);
});
