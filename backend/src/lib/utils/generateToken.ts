import jwt from "jsonwebtoken";
import { type ObjectId } from "mongoose";
import { type Request, type Response } from "express-serve-static-core";

type Props = {
  userId: ObjectId;
  res: Response;
};

export const generateTokenAndSetCookie = ({ userId, res }: Props) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });
  console.log(process.env.NODE_ENV !== "development");
  // Set token as a cookie in the response
  return res.cookie("jwt", token, {
    httpOnly: false,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
