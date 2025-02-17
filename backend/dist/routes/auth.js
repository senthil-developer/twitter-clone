"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = require("../controllers/auth/signup");
const login_1 = require("../controllers/auth/login");
const logout_1 = require("../controllers/auth/logout");
const authProtected_1 = require("../middleware/authProtected");
const getCurrentUser_1 = require("../controllers/auth/getCurrentUser");
const verifyAcc_1 = require("../controllers/auth/verifyAcc");
const createAcc_1 = require("../controllers/auth/createAcc");
const forgetPassword_1 = require("../controllers/auth/forgetPassword");
const resetPassword_1 = require("../controllers/auth/resetPassword");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = express_1.default.Router();
const customKeyGenerator = function (req, res) {
    const forwardedIp = req.headers["x-forwarded-for"];
    const remoteIp = req.connection.remoteAddress;
    const ipAddress = forwardedIp || remoteIp || "unknown";
    return ipAddress.toString();
};
const authRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // Max number of requests
    keyGenerator: customKeyGenerator,
    message: {
        error: "Too many requests from this IP, please try again after a minute",
    },
});
router.get("/me", authProtected_1.authProtected, getCurrentUser_1.getCurrentUser);
router.use(authRateLimit);
router.post("/signup", signup_1.signup);
router.post("/login", login_1.login);
router.post("/logout", logout_1.logout);
router.post("/create-account", createAcc_1.createAcc);
router.post("/verify", verifyAcc_1.Verify);
router.post("/forget-password", forgetPassword_1.forgetPassword);
router.post("/reset-password", resetPassword_1.resetPassword);
exports.default = router;
