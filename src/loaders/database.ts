import mongoose  from "mongoose";
import { MongoClient } from "mongodb";
import Logger from "../logger";
import config from "../config";

export default async (): Promise<void> => {
    if(config.databaseURL !== undefined){
        // console.log(config.databaseURL);
        const client = new MongoClient(config.databaseURL);

        try{
            await client.connect();
            // console.log("Database connected !");

        }catch(error){
            Logger.error("'MongoDB connection error:'")
            process.exit(-1);
        }finally{
            client.close();
        }
    }
  };
  