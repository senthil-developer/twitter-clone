"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const tokenBlacklist_model_1 = __importDefault(require("../../models/tokenBlacklist-model"));
const logout = async (req, res) => {
    try {
        if (!req.cookies.jwt) {
            return res.status(401).json({ error: "login first" });
        }
        const token = req.cookies.jwt;
        const tokenBlacklist = new tokenBlacklist_model_1.default({ token });
        await tokenBlacklist.save();
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ error: "Logout successful" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.logout = logout;
