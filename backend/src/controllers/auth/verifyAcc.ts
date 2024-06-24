import { Request, Response, NextFunction } from "express-serve-static-core";
import User from "../../models/user-model";
import { code } from "../../lib/utils/sendMail";
// import { email } from "./login";
import { generateTokenAndSetCookie } from "../../lib/utils/generateToken";
import { ObjectId } from "mongoose";

export const Verify = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;
    let email = "";
    if (!verificationCode)
      return res.status(400).json({ error: "Verification code is required" });

    if (verificationCode !== code)
      return res.status(400).json({ error: "Verification code is invalid" });

    const user = await User.findOne({ email });

    generateTokenAndSetCookie({ userId: user?._id as ObjectId, res });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
