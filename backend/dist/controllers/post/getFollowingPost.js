"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowingPost = void 0;
const post_model_1 = __importDefault(require("../../models/post-model"));
const user_model_1 = __importDefault(require("../../models/user-model"));
const getFollowingPost = async (req, res) => {
    try {
        const userId = req.user?._id;
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            return res.status(200).json({ error: "user not found" });
        }
        const following = user.following;
        const followingPost = await post_model_1.default.find({ user: { $in: following } })
            .sort({ createdAt: -1 })
            .populate({
            path: "user",
        })
            .populate({
            path: "comments.user",
        });
        res.status(200).json(followingPost);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getFollowingPost = getFollowingPost;
