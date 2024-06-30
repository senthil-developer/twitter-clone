import { type Request, type Response } from "express-serve-static-core";
import User from "../../models/user-model";
import Post from "../../models/post-model";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const currentUser = await User.findById(req.user._id);
      if (!currentUser)
        return res.status(404).json({ error: "User not found" });

      const posts = await Post.find({ user: currentUser?._id });

      currentUser.postsLength = posts.length.toString();

      await currentUser?.save();
      res.status(200).json(currentUser);
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
