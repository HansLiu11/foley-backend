import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env file not found");
}

const mongo_userName = process.env.DB_USERNAME || "user0" ;
const mongo_password = process.env.DB_PASSWORD || "test123" ;
const mongo_dabaseName = process.env.DB_NAME || "patientDB";
const mongo_HOST = process.env.DB_HOST || "patient0.iooez.mongodb.net"

export default {
  port: process.env.PORT,
  databaseURL: `mongodb+srv://${mongo_userName}:${mongo_password}@${mongo_HOST}/${mongo_dabaseName}?ssl=true&retryWrites=true&w=majority`,
  api: {
    prefix: "/api",
  },
};
