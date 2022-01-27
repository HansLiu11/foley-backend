import { Mongoose } from "mongoose";
import Logger from "../logger";
import config from "../config";

const mongoose = new Mongoose();

export default async (): Promise<void> => {
    if(config.databaseURL !== undefined)
        mongoose.connect(config.databaseURL);
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', () =>{Logger.error("'MongoDB connection error:'")});
  };
  