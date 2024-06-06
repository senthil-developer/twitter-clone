import { type Request, type Response } from "express-serve-static-core";
import User from "../../models/user-model";
import { generateTokenAndSendmail } from "../../lib/utils/generateTokenAndSendmail";

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail } = req.body;
    if (!usernameOrEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    generateTokenAndSendmail({ email: user.email, type: "resetPassword" });
    res.status(200).json({ message: `Email sent to ${user.email}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
