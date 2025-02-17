"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../../models/user-model"));
const emailRegex_1 = require("../../lib/utils/emailRegex");
const generateTokenAndSendmail_1 = require("../../lib/utils/generateTokenAndSendmail");
const signup = async (req, res, next) => {
    try {
        const { fullName, username, email, password } = req.body;
        if (!fullName || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (email) {
            (0, emailRegex_1.emailRegex)({ email, res });
        }
        const existingEmail = await user_model_1.default.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "email already exists" });
        }
        const existingUser = await user_model_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({ error: "password must be at least 8 characters length" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await (0, generateTokenAndSendmail_1.generateTokenAndSendmail)({
            email,
            type: "createAcc",
            username,
            fullName,
            password: hashedPassword,
        });
        res.status(200).json({
            message: `Verification mail sended to ${email}`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
