"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = void 0;
const post_model_1 = __importDefault(require("../../models/post-model"));
const cloudinary_1 = require("cloudinary");
const deletePost = async (req, res) => {
    try {
        const userId = req.user?._id;
        const post = await post_model_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "post not found" });
        }
        if (post.user.toString() !== userId?.toString()) {
            return res.status(403).json({ error: "you can only delete your post" });
        }
        if (post.img) {
            const publicId = post.img.split("/")?.pop()?.split(".")[0];
            if (publicId)
                post.img.length > 1 && (await cloudinary_1.v2.uploader.destroy(publicId));
        }
        //  delete post
        await post.deleteOne();
        res.status(200).json({ error: "post deleted" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.deletePost = deletePost;
