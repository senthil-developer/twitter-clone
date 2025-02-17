"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResponse = void 0;
const userResponse = ({ userRes, res }) => {
    return res.status(200).json({
        _id: userRes._id,
        username: userRes.username,
        email: userRes.email,
        password: "",
        fullName: userRes.fullName,
        followers: userRes.followers,
        following: userRes.following,
        profileImg: userRes.profileImg,
        coverImg: userRes.coverImg,
        bio: userRes.bio,
        link: userRes.link,
        likedPosts: userRes.likedPosts,
        createdAt: userRes.createdAt,
        updatedAt: userRes.updatedAt,
    });
};
exports.userResponse = userResponse;
