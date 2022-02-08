import mongoose  from "mongoose";
import config from "./config";
import express from "express";
import Logger from "./logger";
import loader from "./loaders";

async function startServer() {
  const app = express();
  await loader(app);
  
  app
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
