"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnPost = void 0;
const post_model_1 = __importDefault(require("../../models/post-model"));
const commentOnPost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const { comment } = req.body;
        const userId = req.user?._id;
        const post = await post_model_1.default.findById(postId);
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
                user: userId,
            });
            await post.save();
        }
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.commentOnPost = commentOnPost;
