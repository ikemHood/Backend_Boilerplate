// Reading dotenv file
import dotenv from "dotenv";
dotenv.config();

//importing dependencies
import express from "express";
import cookieParser from "cookie-parser";
import colors from "colors";
import logger from "./src/startup/logger.js";
import startup from "./src/startup/index.js";
import routes from "./src/routes/index.js";
import connectDB from "./src/startup/dbConnection.js";
import config from 'config';

//initializing express
const app = express();

// Call the Logger Function
logger(app);

// Call the Startup Function
startup(app);

// Call the Routes Function
routes(app);

// Connect to Database
connectDB();

// Cookie parsing
app.use(cookieParser());

//app port
const PORT = config.get('system.port') || 3000;
const NODE_ENV = config.get('system.node_env') || 'development';

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
