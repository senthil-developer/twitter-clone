import apiKey from "../models/apiKey-model";
import type {
  NextFunction,
  Request,
  Response,
} from "express-serve-static-core";

export const apiKeyProtected = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { api_key } = req.query;
  const public_route = "/api/auth/login" || "/api/auth/login/";
  // Allow access to login route without API key check
  if (req.path === public_route) {
    return next(); // Return here to avoid executing the rest of the middleware
  }

  try {
    // Check if the API key is provided in the query
    if (!api_key) {
      throw new Error("API key is missing");
    }

    // Check if the API key exists in the database
    const api_key_data = await apiKey.findOne({ api_key });
    if (!api_key_data) {
      throw new Error("Unauthorized");
    }

    // If the API key exists, proceed to the next middleware
    next();
  } catch (error: any) {
    // If any error occurs, send an unauthorized response
    res.status(401).json({ error: error });
  }
};
