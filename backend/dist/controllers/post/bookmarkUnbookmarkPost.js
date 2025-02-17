"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkUnbookmarkPost = void 0;
const post_model_1 = __importDefault(require("../../models/post-model"));
const user_model_1 = __importDefault(require("../../models/user-model"));
const bookmarkUnbookmarkPost = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { id: postId } = req.params;
        const post = await post_model_1.default.findById(postId);
        const user = await user_model_1.default.findById(userId);
        if (!post)
            return res.status(404).json({ error: "post not found" });
        const userBookmarkedPost = user?.bookmarks?.includes(postId);
        if (userBookmarkedPost) {
            await user_model_1.default.updateOne({ _id: userId }, { $pull: { bookmarks: postId } });
            res.status(200).json({ message: "UnBookmarked Successfully" });
        }
        else {
            await user_model_1.default.updateOne({ _id: userId }, { $push: { bookmarks: postId } });
            res.status(200).json({ message: "Bookmarked Successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.bookmarkUnbookmarkPost = bookmarkUnbookmarkPost;
