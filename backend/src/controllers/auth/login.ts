import { NextFunction, Request, Response } from "express-serve-static-core";

import User from "../../models/user-model";
import { passwordCompare } from "../../lib/utils/passwordCompare";
import { sendMail } from "../../lib/utils/sendMail";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, usernameOrEmail } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).select("+password");

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    await passwordCompare({
      password,
      hashedPassword: user.password,
      res,
      next,
    });

    sendMail.verify({ userEmail: user.email });

    return res.status(200).json({
      message: `verification mail sent to ${user.email}`,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
