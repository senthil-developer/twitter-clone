import {
  type NextFunction,
  type Request,
  type Response,
} from "express-serve-static-core";
import User from "../../models/user-model";
import { passwordCompare } from "../../lib/utils/passwordCompare";
import { sendMail } from "../../lib/utils/sendMail";

export let email: string;

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, usernameOrEmail } = req.body;

    if (!usernameOrEmail || !password)
      return res.status(400).json({ error: "Email and password is required" });

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).select("+password");

    if (!user) return res.status(400).json({ error: "User not found" });

    await passwordCompare({
      password,
      hashedPassword: user.password,
      res,
      next,
    });
    email = user.email;
    sendMail.verify({ userEmail: user.email });
    res.status(200).json({
      message: `Verification mail sended to ${user.email}`,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
