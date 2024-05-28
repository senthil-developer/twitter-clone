import type {
  NextFunction,
  Request,
  Response,
} from "express-serve-static-core";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user-model";

export const authProtected = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    console.log("decode.userId:", decode.userId); // Log decode.userId
    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(404).json({ error: "Unauthorized: User not found" });
    }
    req.user = req.user || {};
    req.user._id = user._id as string; // Assuming user._id is a string
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
