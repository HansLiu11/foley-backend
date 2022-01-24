import config from "./config";
import express from "express";
import Logger from "./logger";
import http from "http";

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  server
    .listen(config.port, () => {
      Logger.info(`
            ################################################
            🛡️  HTTP server listening on port: ${config.port} 🛡️
            ################################################
        `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
