"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordCompare = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passwordCompare = async ({ password, hashedPassword, res, next, }) => {
    try {
        const passwordMatch = await bcryptjs_1.default.compare(password, hashedPassword);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }
        next();
    }
    catch (error) {
        console.error("Error comparing passwords:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.passwordCompare = passwordCompare;
