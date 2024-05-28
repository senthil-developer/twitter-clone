import { type Request, type Response } from "express-serve-static-core";
import User from "../../models/user-model";
import Post from "../../models/post-model";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    let { img } = req.body;
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!img && !content) {
      return res
        .status(400)
        .json({ error: "post must have either content or image" });
    }

    if (img) {
      const uploadRes = await cloudinary.uploader.upload(img);
      img = uploadRes.secure_url;
    }

    const newPost = new Post({
      user: userId,
      content,
      img,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
