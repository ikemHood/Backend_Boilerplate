import jwt from "jsonwebtoken";
import asyncHandler from "./async.js";
import ErrorResponse from "../helpers/ErrorResponse.js";
import userModel from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";

import config from 'config';

const JWT_SECRET = config.get('jwt.secret');
// Protect routes
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Set token from header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } // Set token from cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this page!.", StatusCodes.UNAUTHORIZED));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await userModel.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this page!.", StatusCodes.UNAUTHORIZED));
  }
});

// Grant Access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`You are not allowed to perform this action!`, StatusCodes.FORBIDDEN)
      );
    }
    next();
  };
};
