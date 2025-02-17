"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndSendmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendMail_1 = require("../../lib/utils/sendMail");
const generateTokenAndSendmail = async ({ email, fullName, password, username, type, }) => {
    if (type === "createAcc") {
        const token = jsonwebtoken_1.default.sign({ email, username, password, fullName }, process.env.CREATE_ACC_JWT_SECRET, {
            expiresIn: "600s",
        });
        await sendMail_1.sendMail.createAcc({ userEmail: email, redirect_url: token });
    }
    else {
        const token = jsonwebtoken_1.default.sign({ email }, process.env.RESET_PASSWORD_JWT_SECRET, {
            expiresIn: "600s",
        });
        await sendMail_1.sendMail.resetPassword({ userEmail: email, redirect_url: token });
    }
};
exports.generateTokenAndSendmail = generateTokenAndSendmail;
