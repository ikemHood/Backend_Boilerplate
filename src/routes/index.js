import errorMiddleware from "../middlewares/error-middleware.js";
import { StatusCodes } from "http-status-codes";
import AuthRoutes from "./auth.route.js"

export default function (app) {
  //Mount Routers
  app.use('/api/auth', AuthRoutes)

  //handle pinging
  app.all('/ping', (req, res) => {
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Pong",
    });
  });
  
  //handle unavailable endpoints
  app.all('*', (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });

  // Error Middleware
  app.use(errorMiddleware);
}