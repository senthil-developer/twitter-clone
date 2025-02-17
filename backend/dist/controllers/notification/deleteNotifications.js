"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotifications = void 0;
const notification_model_1 = __importDefault(require("../../models/notification-model"));
const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user?._id;
        await notification_model_1.default.deleteMany({ toUser: userId });
        res.status(200).json({ error: "Notifications deleted successfully" });
    }
    catch (error) {
        console.log("Error in deleteNotifications function", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteNotifications = deleteNotifications;
