"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
const user_model_1 = __importDefault(require("../../models/user-model"));
const sendMail_1 = require("../../lib/utils/sendMail");
// import { email } from "./login";
const generateToken_1 = require("../../lib/utils/generateToken");
const Verify = async (req, res) => {
    try {
        const { verificationCode } = req.body;
        let email = "senthildeveloper4@gmail.com";
        if (!verificationCode)
            return res.status(400).json({ error: "Verification code is required" });
        if (verificationCode !== sendMail_1.code)
            return res.status(400).json({ error: "Verification code is invalid" });
        const user = await user_model_1.default.findOne({ email });
        (0, generateToken_1.generateTokenAndSetCookie)({ userId: user?._id, res });
        return res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.Verify = Verify;
