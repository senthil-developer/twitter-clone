"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegex = void 0;
const emailRegex = ({ email, res }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: "Invalid email format" });
    }
};
exports.emailRegex = emailRegex;
