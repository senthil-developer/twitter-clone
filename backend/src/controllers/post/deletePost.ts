import { type Request, type Response } from "express-serve-static-core";
import Post from "../../models/post-model";
import { v2 as cloudinary } from "cloudinary";

export const deletePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    if (post.user.toString() !== userId?.toString()) {
      return res.status(403).json({ error: "you can only delete your post" });
    }

    if (post.img) {
      const publicId = post.img.split("/")?.pop()?.split(".")[0];
      if (publicId)
        post.img.length > 1 && (await cloudinary.uploader.destroy(publicId));
    }

    //  delete post
    await post.deleteOne();

    res.status(200).json({ error: "post deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
