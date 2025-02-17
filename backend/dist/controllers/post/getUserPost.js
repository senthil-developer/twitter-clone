"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPost = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const post_model_1 = __importDefault(require("../../models/post-model"));
const getUserPost = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await user_model_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const posts = await post_model_1.default.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("comments.user");
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getUserPost = getUserPost;
