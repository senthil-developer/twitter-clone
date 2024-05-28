import { type Request, type Response } from "express-serve-static-core";
import User from "../../models/user-model";
import Post from "../../models/post-model";

export const getUserPost = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
