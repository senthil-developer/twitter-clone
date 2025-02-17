"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const post_model_1 = __importDefault(require("../../models/post-model"));
const getCurrentUser = async (req, res) => {
    try {
        if (req.user) {
            const currentUser = await user_model_1.default.findById(req.user._id);
            if (!currentUser)
                return res.status(404).json({ error: "User not found" });
            const posts = await post_model_1.default.find({ user: currentUser?._id });
            currentUser.postsLength = posts.length.toString();
            await currentUser?.save();
            res.status(200).json(currentUser);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
exports.getCurrentUser = getCurrentUser;
