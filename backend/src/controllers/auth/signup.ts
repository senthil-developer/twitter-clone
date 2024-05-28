import { type Request, type Response } from "express-serve-static-core";
import bcrypt from "bcryptjs";
import user from "../../models/user-model";
import { generateTokenAndSetCookie } from "../../lib/utils/generateToken";
import { userResponse } from "../../lib/utils/userResponse";
import { emailRegex } from "../../lib/utils/emailRegex";
import { ObjectId } from "mongoose";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, password } = req.body;
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (email) {
      emailRegex({ email, res });
    }

    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "email already exists" });
    }

    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "password must be at least 8 characters length" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = new user({
      username,
      email,
      fullName,
      password: hashedPassword,
    });
    console.log(newUser);

    if (newUser) {
      generateTokenAndSetCookie({ userId: newUser._id as ObjectId, res });
      await newUser.save();
      userResponse({ userRes: newUser, res });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
