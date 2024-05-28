import { type Request, type Response } from "express-serve-static-core";
import user from "../../models/user-model";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const findUser = await user.findById(req.user._id);
      res.status(200).json(findUser);
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
