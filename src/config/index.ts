import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env file not found");
}

export default {
  port: process.env.PORT,
  databaseURL: process.env.DB_URL,
  api: {
    prefix: "/api",
  },
};
