#!/usr/bin/env node
// npm install fastify@3.2
const server = require("fastify")();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;
console.log(`fib worker pid=${process.pid}`);
server.get("/:limit", async (req, reply) => {
  // console.log("start get");
  await sleep(10);
  // console.log("start fibonacci");
  return String(fibonacci(Number(req.params.limit)));
});
server.listen(PORT, HOST, () => {
  console.log(`Producer running at http://${HOST}:${PORT}`);
});
function fibonacci(limit) {
  // console.log("fibonacci called");
  let prev = 1n,
    next = 0n,
    swap;
  while (limit) {
    swap = prev;
    prev = prev + next;
    next = swap;
    limit--;
  }
  return next;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
