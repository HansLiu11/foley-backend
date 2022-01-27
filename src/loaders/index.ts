import databaseLoader  from "./database";
import Logger from "../logger";

export default async (): Promise<void> => {
    await databaseLoader();
    Logger.info("✌️ MongoDB loaded and connected");
  };
  