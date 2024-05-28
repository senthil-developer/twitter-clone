import { type Request, type Response } from "express-serve-static-core";

type Props = {
  email: string;
  res: Response;
};

export const emailRegex = ({ email, res }: Props) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email format" });
  }
};
