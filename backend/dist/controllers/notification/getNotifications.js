"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = void 0;
const notification_model_1 = __importDefault(require("../../models/notification-model"));
const getNotifications = async (req, res) => {
    try {
        const userId = req.user?._id;
        const notifications = await notification_model_1.default.find({ toUser: userId }).populate({
            path: "fromUser",
            select: "username profileImg",
        });
        await notification_model_1.default.updateMany({ toUser: userId }, { read: true });
        res.status(200).json(notifications);
    }
    catch (error) {
        console.log("Error in getNotifications function", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getNotifications = getNotifications;
