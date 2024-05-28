import { type Request, type Response } from "express-serve-static-core";
import Post from "../../models/post-model";
import { Types } from "mongoose";

export const commentOnPost = async (req: Request, res: Response) => {
  try {
    const { id: postId } = req.params;
    const { comment } = req.body;
    const userId = req.user?._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!comment) {
      return res.status(400).json({ error: "Comment is required" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    if (post.comments) {
      post.comments.push({
        comment,
        user: userId as unknown as Types.ObjectId,
      });
      await post.save();
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
};
