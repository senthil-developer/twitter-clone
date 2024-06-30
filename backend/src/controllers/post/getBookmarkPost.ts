import type { Request, Response } from "express-serve-static-core";
import Post from "../../models/post-model";
import User from "../../models/user-model";

export const getBookmarkPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).json({ error: "user not found" });
    }

    const bookmarks = user.bookmarks;

    const bookmarksPost = await Post.find({ _id: { $in: bookmarks } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
      })
      .populate({
        path: "comments.user",
      });
    res.status(200).json(bookmarksPost);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
