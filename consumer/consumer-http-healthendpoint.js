#!/usr/bin/env node
// npm install fastify@3.2 node-fetch@2.6
// Warning: Not as efficient as using a Reverse Proxy
const server = require("fastify")();
const fetch = require("node-fetch");
const HOST = "127.0.0.1";
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || "127.0.0.1:4000";

let counter = 0;

server.get("/", async () => {
  const req = await fetch(`http://${TARGET}/recipes/42`);
  const payload = await req.json();
  return {
    consumer_pid: process.pid,
    producer_data: payload,
  };
});
server.get("/health", async () => {
  counter++;
  console.log("health check ", counter);
  return "OK";
});
server.listen(PORT, HOST, () => {
  console.log(`Basic Consumer running at http://${HOST}:${PORT}/`);
});
