"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcc = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenBlacklist_model_1 = __importDefault(require("../../models/tokenBlacklist-model"));
const user_model_1 = __importDefault(require("../../models/user-model"));
const generateToken_1 = require("../../lib/utils/generateToken");
const logger_1 = __importDefault(require("../../lib/utils/logger"));
const createAcc = async (req, res, next) => {
    try {
        const verify = req.query.verify;
        if (!verify)
            return res.status(401).json({ error: "Unauthorized" });
        const tokenBlackList = await tokenBlacklist_model_1.default.findOne({ token: verify });
        if (tokenBlackList)
            return res.status(401).json({ error: "Account already created" });
        const verifyToken = (await jsonwebtoken_1.default.verify(verify, process.env.CREATE_ACC_JWT_SECRET));
        if (!verifyToken)
            return res.status(401).json({ error: "Unauthorized Token" });
        const { email, fullName, password, username } = verifyToken;
        const user = new user_model_1.default({
            email,
            password,
            username,
            fullName,
        });
        await user.save();
        const addBlacklist = new tokenBlacklist_model_1.default({ token: verify });
        await addBlacklist.save();
        await (0, generateToken_1.generateTokenAndSetCookie)({ userId: user._id, res });
        return res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error("error", error);
        next(error);
    }
};
exports.createAcc = createAcc;
