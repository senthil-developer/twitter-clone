import { type Request, type Response } from "express-serve-static-core";
import Post from "../../models/post-model";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
      })
      .populate({
        path: "comments.user",
      });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};
