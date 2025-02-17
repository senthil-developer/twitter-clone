"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleNotification = void 0;
const notification_model_1 = __importDefault(require("../../models/notification-model"));
const deleteSingleNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user?._id;
        const notification = await notification_model_1.default.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        if (!userId) {
            return res.status(401).json({ error: "User not found" });
        }
        if (notification.toString() !== userId.toString()) {
            return res
                .status(403)
                .json({ error: "You are not allowed to delete this notification" });
        }
        await notification_model_1.default.findByIdAndDelete(notificationId);
        res.status(200).json({ error: "Notification deleted successfully" });
    }
    catch (error) {
        console.log("Error in deleteNotification function", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteSingleNotification = deleteSingleNotification;
