"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.follow_unFollowUser = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const notification_model_1 = __importDefault(require("../../models/notification-model"));
const follow_unFollowUser = async (req, res) => {
    const { id } = req.params;
    try {
        const toActionId = await user_model_1.default.findById(id);
        if (req.user) {
            console.log(req.user._id.toString(), "from current");
            console.log(id, "from params");
            const currentUser = await user_model_1.default.findById(req.user._id);
            if (!currentUser || !toActionId) {
                return res.status(404).json({
                    error: "User not found",
                });
            }
            if (id === req.user._id.toString()) {
                return res.status(400).json({
                    error: "You cannot follow yourself",
                });
            }
            const following = currentUser.following.includes(id);
            if (following) {
                await user_model_1.default.findByIdAndUpdate(id, {
                    $pull: { followers: req.user._id },
                });
                await user_model_1.default.findByIdAndUpdate(req.user._id, {
                    $pull: { following: id },
                });
                res.status(200).json({ data: "User unFollowed successFully" });
            }
            else {
                await user_model_1.default.findByIdAndUpdate(id, {
                    $push: { followers: req.user._id },
                });
                await user_model_1.default.findByIdAndUpdate(req.user._id, {
                    $push: { following: id },
                });
                const newNotification = new notification_model_1.default({
                    type: "follow",
                    fromUser: id,
                    toUser: toActionId._id,
                });
                await newNotification.save();
                res.status(200).json({ data: "User followed successFully" });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server Error",
        });
    }
};
exports.follow_unFollowUser = follow_unFollowUser;
