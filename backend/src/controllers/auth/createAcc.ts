import {
  type Request,
  type Response,
  NextFunction,
} from "express-serve-static-core";
import jwt from "jsonwebtoken";
import TokenBlacklist from "../../models/tokenBlacklist-model";
import User from "../../models/user-model";
import { generateTokenAndSetCookie } from "../../lib/utils/generateToken";
import { ObjectId } from "mongoose";
import logger from "../../lib/utils/logger";

interface userDetails {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

export const createAcc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verify = req.query.verify as string;
    if (!verify) return res.status(401).json({ error: "Unauthorized" });

    const tokenBlackList = await TokenBlacklist.findOne({ token: verify });

    if (tokenBlackList)
      return res.status(401).json({ error: "Account already created" });

    const verifyToken = (await jwt.verify(
      verify,
      process.env.CREATE_ACC_JWT_SECRET!
    )) as userDetails;

    if (!verifyToken)
      return res.status(401).json({ error: "Unauthorized Token" });

    const { email, fullName, password, username } = verifyToken;

    const user = new User({
      email,
      password,
      username,
      fullName,
    });

    await user.save();

    const addBlacklist = new TokenBlacklist({ token: verify });

    await addBlacklist.save();

    await generateTokenAndSetCookie({ userId: user._id as ObjectId, res });

    return res.status(200).json(user);
  } catch (error: any) {
    logger.error("error", error);
    next(error);
  }
};
