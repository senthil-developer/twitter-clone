"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikedPost = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const post_model_1 = __importDefault(require("../../models/post-model"));
const getLikedPost = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await user_model_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const likedPosts = await post_model_1.default.find({ _id: { $in: user.likedPosts } })
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("comments.user");
        res.status(200).json(likedPosts);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getLikedPost = getLikedPost;
