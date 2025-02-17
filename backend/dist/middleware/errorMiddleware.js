"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const logger_1 = __importDefault(require("../lib/utils/logger"));
const errorMiddleware = (error, req, res, next) => {
    logger_1.default.error(error.stack); // Log the error stack
    if (error.name === "JsonWebTokenError") {
        // Handle invalid token error
        return res.status(400).json({ error: "Invalid Token" });
    }
    else if (error.name === "TokenExpiredError") {
        // Handle expired token error
        return res.status(401).json({ error: "Expired Token" });
    }
    else {
        // Handle other errors
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.errorMiddleware = errorMiddleware;
