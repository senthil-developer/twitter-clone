"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
const post_model_1 = __importDefault(require("../../models/post-model"));
const getAllPosts = async (req, res) => {
    try {
        const posts = await post_model_1.default.find({})
            .sort({ createdAt: -1 })
            .populate({
            path: "user",
        })
            .populate({
            path: "comments.user",
        });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.getAllPosts = getAllPosts;
