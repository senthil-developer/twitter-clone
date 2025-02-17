"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.code = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const resetPasswordTemplate_1 = require("../../templates/resetPasswordTemplate");
const verifyAccTemplate_1 = require("../../templates/verifyAccTemplate");
const generateVerificationCode_1 = require("./generateVerificationCode");
const logger_1 = __importDefault(require("./logger"));
const createAccTemplate_1 = require("../../templates/createAccTemplate");
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const redirectUri = process.env.REDIRECT_URI;
const oAuth2Client = new googleapis_1.google.auth.OAuth2({
    clientId,
    clientSecret,
    redirectUri,
});
oAuth2Client.setCredentials({
    refresh_token: refreshToken,
});
exports.code = (0, generateVerificationCode_1.generateVerificationCode)(6);
async function mail({ userEmail, redirect_url, type }) {
    try {
        const accessToken = (await oAuth2Client.getAccessToken());
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.FROM_USER,
                clientId,
                clientSecret,
                refreshToken,
                accessToken,
            },
        });
        let mailOptions = {};
        if (type === "createAcc") {
            mailOptions = {
                from: process.env.FROM_USER,
                to: userEmail,
                subject: "create account",
                text: "This is a test email sent from Nodemailer with Gmail.",
                html: (0, createAccTemplate_1.createAccTemplate)(redirect_url),
            };
        }
        if (type === "resetPassword") {
            mailOptions = {
                from: process.env.FROM_USER,
                to: userEmail,
                subject: "Reset Your Password",
                text: "This is a test email sent from Nodemailer with Gmail.",
                html: (0, resetPasswordTemplate_1.ResetPasswordTemplate)(redirect_url),
            };
        }
        if (type === "verify") {
            mailOptions = {
                from: process.env.FROM_USER,
                to: userEmail,
                subject: "Verify Your Account",
                text: "This is a test email sent from Nodemailer with Gmail.",
                html: (0, verifyAccTemplate_1.verifyAccTemplate)(exports.code),
            };
        }
        const res = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully", res);
    }
    catch (err) {
        logger_1.default.error(`Error occurred while sending email: ${err}`);
        throw err;
    }
}
exports.sendMail = {
    verify: ({ userEmail }) => mail({ userEmail, type: "verify" }),
    resetPassword: ({ userEmail, redirect_url }) => mail({ userEmail, redirect_url, type: "resetPassword" }),
    createAcc: ({ userEmail, redirect_url }) => mail({ userEmail, redirect_url, type: "createAcc" }),
};
