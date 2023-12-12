import ErrorResponse from "../helpers/ErrorResponse.js";
import { StatusCodes } from "http-status-codes";

export default function (err, req, res, next) {
  let error = { ...err };

  error.message = err.message;

  // winston.log('error', err.message);
  console.log(err.message.red);

  /* === Logging level ===
   *  error
   *  warn
   *  info
   *  verbose
   *  debug
   *  silly
   * */

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found!`;
    error = new ErrorResponse(message, StatusCodes.NOT_FOUND);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    // Constructed the Duplicate message
    const duplicates = Object.entries(err.keyValue).map(([id, value]) => ({ id, value }));
    let message = "Resource with ";
    duplicates.forEach(duplicate => {
      message += `${duplicate.id}: ${duplicate.value}, `;
    })
    message += `already exists. `;
    error = new ErrorResponse(message, StatusCodes.CONFLICT);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = (err.errors).map((val) => val.message);
    error = new ErrorResponse(message, StatusCodes.BAD_REQUEST);
  }

  res
    .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ success: false, error: error.message || "Server Error" });
};
