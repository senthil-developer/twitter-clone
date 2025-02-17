"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenBlacklist_model_1 = __importDefault(require("../../models/tokenBlacklist-model"));
const resetPassword = async (req, res, next) => {
    try {
        const { verify } = req.query;
        if (!verify)
            return res.status(401).json({ error: "Unauthorized" });
        const tokenVerify = await tokenBlacklist_model_1.default.findOne({ token: verify });
        if (tokenVerify)
            return res.status(401).json({ error: "Token has been invalidated" });
        const decode = jsonwebtoken_1.default.verify(verify, process.env.RESET_PASSWORD_JWT_SECRET);
        if (!decode)
            return res.status(401).json({ error: "Invalid credentials " });
        const user = await user_model_1.default.findOne({ email: decode.email }).select("-password");
        if (!user)
            return res.status(401).json({ error: "user not found" });
        const { password, confirmPassword } = req.body;
        if (!password || !confirmPassword) {
            return res
                .status(400)
                .json({ error: "Please enter password and confirm password" });
        }
        if (confirmPassword.length < 8 || password.length < 8) {
            return res
                .status(400)
                .json({ error: "Password must be at least 8 characters" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        if (password === user.password)
            return res.status(400).json({ error: "Please enter a new password" });
        let hashedPassword = user.password;
        password && (hashedPassword = await bcryptjs_1.default.hash(password, 10));
        user.password = hashedPassword;
        const addToken = new tokenBlacklist_model_1.default({ token: verify });
        await addToken.save();
        await user.save();
        res.status(200).json({
            message: "Password reset successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
