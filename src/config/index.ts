import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env file not found");
}

export default {
  port: process.env.PORT,
  databaseURL: process.env.DB_URI,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    pwd: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
  api: {
    prefix: "/api",
  },
};
