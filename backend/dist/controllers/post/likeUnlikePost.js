"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeUnlikePost = void 0;
const post_model_1 = __importDefault(require("../../models/post-model"));
const notification_model_1 = __importDefault(require("../../models/notification-model"));
const user_model_1 = __importDefault(require("../../models/user-model"));
const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { id: postId } = req.params;
        const post = await post_model_1.default.findById(postId);
        if (!post)
            return res.status(404).json({ error: "post not found" });
        const userLikedPost = post.likes?.includes(userId);
        if (userLikedPost) {
            // const r = await Post.updateOne({_id:postId},{pull :{likes : userId}})
            await post_model_1.default.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await user_model_1.default.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
            const updatedLikes = post.likes?.filter((id) => id.toString() !== userId?.toString());
            // i want do delete notification when i dislike post
            res.status(200).json(updatedLikes);
        }
        else {
            post.likes?.push(userId);
            await user_model_1.default.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();
            const notification = new notification_model_1.default({
                fromUser: userId,
                toUser: post.user._id,
                type: "like",
            });
            await notification.save();
            const updatedLikes = post.likes;
            res.status(200).json(updatedLikes);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.likeUnlikePost = likeUnlikePost;
