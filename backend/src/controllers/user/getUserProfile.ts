import { type Request, type Response } from "express-serve-static-core";
import user from "../../models/user-model";
import Post from "../../models/post-model";

export const getUserProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const userProfile = await user.findOne({ username });
    if (!userProfile) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const posts = await Post.find({ user: userProfile._id });

    userProfile.postsLength = posts.length.toString();

    await userProfile.save();

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
    });
  }
};
