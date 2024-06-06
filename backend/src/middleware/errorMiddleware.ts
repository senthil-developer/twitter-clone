import { NextFunction, Request, Response } from "express-serve-static-core";
import logger from "../lib/utils/logger";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.stack); // Log the error stack

  if (error.name === "JsonWebTokenError") {
    // Handle invalid token error
    return res.status(400).json({ error: "Invalid Token" });
  } else if (error.name === "TokenExpiredError") {
    // Handle expired token error
    return res.status(401).json({ error: "Expired Token" });
  } else {
    // Handle other errors
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
