import {
  type Request,
  type Response,
  NextFunction,
} from "express-serve-static-core";
import User from "../../models/user-model";
import bcrypt from "bcryptjs";
import jwt, { VerifyErrors, VerifyOptions } from "jsonwebtoken";
import TokenBlacklist from "../../models/tokenBlacklist-model";

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verify } = req.query;
    if (!verify) return res.status(401).json({ error: "Unauthorized" });

    const tokenVerify = await TokenBlacklist.findOne({ token: verify });

    if (tokenVerify)
      return res.status(401).json({ error: "Token has been invalidated" });

    const decode = jwt.verify(
      verify as string,
      process.env.RESET_PASSWORD_JWT_SECRET!
    ) as VerifyErrors & VerifyOptions & { email: string };

    if (!decode) return res.status(401).json({ error: "Invalid credentials " });

    const user = await User.findOne({ email: decode.email }).select(
      "-password"
    );
    if (!user) return res.status(401).json({ error: "user not found" });

    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "Please enter password and confirm password" });
    }

    if (confirmPassword.length < 8 || password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    if (password === user.password)
      return res.status(400).json({ error: "Please enter a new password" });

    let hashedPassword = user.password;
    password && (hashedPassword = await bcrypt.hash(password, 10));

    user.password = hashedPassword;
    const addToken = new TokenBlacklist({ token: verify });
    await addToken.save();
    await user.save();
    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error: any) {
    next(error);
  }
};
