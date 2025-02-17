"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const post_model_1 = __importDefault(require("../../models/post-model"));
const cloudinary_1 = require("cloudinary");
const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        let { img } = req.body;
        const userId = req.user?._id;
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!img && !content) {
            return res
                .status(400)
                .json({ error: "post must have either content or image" });
        }
        if (img) {
            const uploadRes = await cloudinary_1.v2.uploader.upload(img);
            img = uploadRes.secure_url;
        }
        const newPost = new post_model_1.default({
            user: userId,
            content,
            img,
        });
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.createPost = createPost;
