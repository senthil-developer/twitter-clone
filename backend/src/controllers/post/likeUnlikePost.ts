import { type Request, type Response } from "express-serve-static-core";
import Post from "../../models/post-model";
import Notification from "../../models/notification-model";
import type { Types } from "mongoose";
import User from "../../models/user-model";

export const likeUnlikePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ msg: "post not found" });

    const userLikedPost = post.likes?.includes(
      userId as unknown as Types.ObjectId
    );

    if (userLikedPost) {
      // const r = await Post.updateOne({_id:postId},{pull :{likes : userId}})
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      const updatedLikes = post.likes?.filter(
        (id) => id.toString() !== userId?.toString()
      );
      // i want do delete notification when i dislike post

      res.status(200).json(updatedLikes);
    } else {
      post.likes?.push(userId as unknown as Types.ObjectId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const notification = new Notification({
        fromUser: userId,
        toUser: post.user._id,
        type: "like",
      });
      await notification.save();
      const updatedLikes = post.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
