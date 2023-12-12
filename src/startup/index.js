import express from "express";
import cors from "cors";
// import { rateLimit } from "express-rate-limit";
import config from "config";

export default function (app) {
  const APP_FRONT = config.get('front.domain')

  //invoking imported dependencies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        APP_FRONT
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  // app.use(
  // rateLimit({
  //     windowMs: 5 * 60 * 1000, // 10 mins
  //     max: 100, // maximal request for all endpoint
  //     //   message: "To many request, send back request after 3 minutes",
  //   })
  // );
}
