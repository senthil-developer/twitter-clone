import {
  type Request,
  type Response,
  NextFunction,
} from "express-serve-static-core";
import bcrypt from "bcryptjs";
import User, { UserTypes } from "../../models/user-model";
import { emailRegex } from "../../lib/utils/emailRegex";
import { generateTokenAndSendmail } from "../../lib/utils/generateTokenAndSendmail";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, username, email, password } = req.body;
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (email) {
      emailRegex({ email, res });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "email already exists" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "password must be at least 8 characters length" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await generateTokenAndSendmail({
      email,
      type: "createAcc",
      username,
      fullName,
      password: hashedPassword,
    });
    res.status(200).json({
      message: `Verification mail sended to ${email}`,
    });
  } catch (error) {
    next(error);
  }
};
