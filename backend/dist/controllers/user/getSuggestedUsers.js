"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuggestedUsers = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const getSuggestedUsers = async (req, res) => {
    try {
        if (req.user) {
            const userId = req.user._id;
            // Fetch only the 'following' field
            const { following } = (await user_model_1.default.findById(userId));
            // Aggregate to get a sample of users excluding the current user
            const users = await user_model_1.default.aggregate([
                { $match: { _id: { $ne: userId } } },
                { $sample: { size: 10 } },
            ]);
            // Filter out users followed by the current user
            const suggestedUsers = users
                .filter((user) => !following.includes(user._id))
                .map(({ _id, username, email, fullName, following, followers, profileImg, coverImg, bio, link, createdAt, updatedAt, likedPosts, }) => ({
                _id,
                username,
                email,
                fullName,
                followers,
                following,
                profileImg,
                coverImg,
                bio,
                link,
                likedPosts,
                createdAt,
                updatedAt,
            }))
                .slice(0, 4);
            res.json(suggestedUsers);
        }
    }
    catch (error) {
        console.log("Error in getSuggestedUsers: ", error);
        res.status(500).json({ error: "error" });
    }
};
exports.getSuggestedUsers = getSuggestedUsers;
