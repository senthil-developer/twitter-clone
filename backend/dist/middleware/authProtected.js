"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProtected = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user-model"));
const authProtected = async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No Token Provided" });
        }
        const decode = (await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET));
        const user = await user_model_1.default.findById(decode.userId);
        if (!user) {
            return res.status(404).json({ error: "Unauthorized: User not found" });
        }
        req.user = req.user || {};
        req.user._id = user._id;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authProtected = authProtected;
