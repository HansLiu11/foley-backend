import express, { Response } from "express";
import cors from "cors";
import routes from "../api";
import config from "../config";
import Logger from "../logger";
import rateLimit from "express-rate-limit";
export default (app: express.Application): void => {
  /**
   * Health Check endpoints
   */
  app.get("/status", (req, res) => {
    // res.json({'message': 'ok'});
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");

  //  apply to all requests
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minutes
      max: 100, //it will be ban if more than 100 requests in a time period
    })
  );
  app.use(cors());
  app.use(express.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    res.status(404);
    next(err);
  });

  // Error handler it will log the error and warn
  // The level of log depends on status code
  app.use((err: Error, req: any, res: Response, next: any) => {
    if (res.statusCode < 500 && res.statusCode >= 400) {
      Logger.warn(err.stack);
    } else {
      res.status(500);
      Logger.error(err.stack);
    }
    res.json({ error: err.message });
  });
};
