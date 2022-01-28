
import winston from "winston";
import config from "../config";

const transports: winston.transport[] = [];
const timeFormat = winston.format.timestamp({
  format: "YYYY-MM-DD HH:mm:ss Z",
});

if (process.env.NODE_ENV === "production") {
  
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
}

  
const LoggerInstance = winston.createLogger({
    // 當 transport 不指定 level 時 , 使用 info 等級
    level: 'info',
    // 設定輸出格式0
    levels: winston.config.npm.levels,
    format: winston.format.combine(
      timeFormat,
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    // 設定此 logger 的日誌輸出器
    transports,
  });
  
  export default LoggerInstance;
  