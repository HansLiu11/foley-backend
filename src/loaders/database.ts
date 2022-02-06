import mongoose  from "mongoose";
import { MongoClient } from "mongoose/node_modules/mongodb";
import Logger from "../logger";
import config from "../config";

export default async (): Promise<void> => {
    if(config.databaseURL !== undefined){
        // console.log(config.databaseURL);

        try{
            const url = "mongodb://127.0.0.1:27017/patient";
            await mongoose.connect(url)
            .then((result) => console.log('MongoDB been connected'))
            .catch(e=>console.log(e));
            
            mongoose.Promise = global.Promise;

        }catch(error){
            Logger.error("'MongoDB connection error:'")
            process.exit(-1);
        }
    }
  };
  