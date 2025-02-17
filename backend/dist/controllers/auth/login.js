"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const passwordCompare_1 = require("../../lib/utils/passwordCompare");
const sendMail_1 = require("../../lib/utils/sendMail");
const login = async (req, res, next) => {
    try {
        const { password, usernameOrEmail } = req.body;
        if (!usernameOrEmail || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const user = await user_model_1.default.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        }).select("+password");
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        await (0, passwordCompare_1.passwordCompare)({
            password,
            hashedPassword: user.password,
            res,
            next,
        });
        sendMail_1.sendMail.verify({ userEmail: user.email });
        return res.status(200).json({
            message: `verification mail sent to ${user.email}`,
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.login = login;
