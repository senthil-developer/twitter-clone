import { type Request, type Response } from "express-serve-static-core";
import User from "../../models/user-model";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const currentUser = await User.findById(req.user._id);
      res.status(200).json(currentUser);
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
