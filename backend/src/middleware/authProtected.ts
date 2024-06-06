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
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    const decode = (await jwt.verify(
      token,
      process.env.JWT_SECRET!
    )) as JwtPayload;

    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(404).json({ error: "Unauthorized: User not found" });
    }
    req.user = req.user || {};
    req.user._id = user._id as string;
    next();
  } catch (error: any) {
    next(error);
  }
};
