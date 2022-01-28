import databaseLoader  from "./database";
import expressLoader from "./express";
import Logger from "../logger";
import e from "express";

export default async (expressApp: e.Application): Promise<void> => {
    await databaseLoader();
    Logger.info("✌️ MongoDB loaded and connected");

    expressLoader(expressApp);
    Logger.info("✌️ Express loaded");

  };

  