import {
  type NextFunction,
  type Request,
  type Response,
} from "express-serve-static-core";
import User from "../../models/user-model";
import { userResponse } from "../../lib/utils/userResponse";
import { passwordCompare } from "../../lib/utils/passwordCompare";
import { generateTokenAndSetCookie } from "../../lib/utils/generateToken";
import { ObjectId } from "mongoose";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { usernameOrEmail, password } = req.body;
  try {
    if (!usernameOrEmail || !password) {
      return res
        .status(400)
        .json({ error: "Username/Email and password are required" });
    }

    // Check if the user exists with the given username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid username/email" });
    }

    await passwordCompare({
      password,
      hashedPassword: user.password,
      res,
      next,
    });

    generateTokenAndSetCookie({ userId: user._id as ObjectId, res });

    return userResponse({ userRes: user, res });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
