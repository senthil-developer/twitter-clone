import { type Request, type Response } from "express-serve-static-core";
import Post from "../../models/post-model";
import Notification from "../../models/notification-model";
import type { Types } from "mongoose";
import User from "../../models/user-model";

export const bookmarkUnbookmarkPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post) return res.status(404).json({ error: "post not found" });

    const userBookmarkedPost = user?.bookmarks?.includes(
      postId as unknown as Types.ObjectId
    );

    if (userBookmarkedPost) {
      await User.updateOne({ _id: userId }, { $pull: { bookmarks: postId } });

      res.status(200).json({ message: "UnBookmarked Successfully" });
    } else {
      await User.updateOne({ _id: userId }, { $push: { bookmarks: postId } });

      res.status(200).json({ message: "Bookmarked Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
