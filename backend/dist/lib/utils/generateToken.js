"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndSetCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenAndSetCookie = ({ userId, res }) => {
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    // Set token as a cookie in the response
    return res.cookie("jwt", token, {
        httpOnly: false,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
};
exports.generateTokenAndSetCookie = generateTokenAndSetCookie;
