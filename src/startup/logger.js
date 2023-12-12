import winston from "winston";
import morgan from "morgan";
import config from 'config';

const NODE_ENV = config.get('system.node_env') || 'development';

export default function (app) {

  // Dev Logging Middleware
  if (NODE_ENV !== "production") {
    app.use(morgan("dev"));
  }

  // Handle uncaught exceptions
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "logs/exception.log" })
  );

  //Handle unhandled promise rejections
  process.on("unhandledRejection", (ex) => {
    console.log("We got an unhandled rejection".red.bold);
    console.log(ex.message, ex);
    winston.error(ex.message, ex);
  });

  winston.add(
    new winston.transports.File({ filename: "logs/error.log", level: "error" })
  );
}
