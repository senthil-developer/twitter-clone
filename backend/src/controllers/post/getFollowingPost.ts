import type { Request, Response } from "express-serve-static-core";
import Post from "../../models/post-model";
import User from "../../models/user-model";

export const getFollowingPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({ error: "user not found" });
    }

    const following = user.following;

    const followingPost = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
      })
      .populate({
        path: "comments.user",
      });
    res.status(200).json(followingPost);
  } catch (error) {
    res.status(500).json({ error });
  }
};
