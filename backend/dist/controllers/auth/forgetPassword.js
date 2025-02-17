"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const generateTokenAndSendmail_1 = require("../../lib/utils/generateTokenAndSendmail");
const forgetPassword = async (req, res) => {
    try {
        const { usernameOrEmail } = req.body;
        if (!usernameOrEmail) {
            return res.status(400).json({ error: "Email is required" });
        }
        const user = await user_model_1.default.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        (0, generateTokenAndSendmail_1.generateTokenAndSendmail)({ email: user.email, type: "resetPassword" });
        res.status(200).json({ message: `Email sent to ${user.email}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.forgetPassword = forgetPassword;
