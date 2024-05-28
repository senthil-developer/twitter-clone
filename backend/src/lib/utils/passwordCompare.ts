import bcrypt from "bcryptjs";
import { Response, NextFunction } from "express-serve-static-core";

type Props = {
  password: string;
  hashedPassword: string;
  res: Response;
  next: NextFunction;
};

export const passwordCompare = async ({
  password,
  hashedPassword,
  res,
  next,
}: Props) => {
  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    next();
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
