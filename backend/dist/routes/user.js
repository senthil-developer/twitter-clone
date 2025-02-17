"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateUser_1 = require("../controllers/user/updateUser");
const authProtected_1 = require("../middleware/authProtected");
const getUserProfile_1 = require("../controllers/user/getUserProfile");
const follow_unfollowUser_1 = require("../controllers/user/follow_unfollowUser");
const getSuggestedUsers_1 = require("../controllers/user/getSuggestedUsers");
const router = express_1.default.Router();
router.get("/profile/:username", getUserProfile_1.getUserProfile);
router.use(authProtected_1.authProtected);
router.post("/follow/:id", follow_unfollowUser_1.follow_unFollowUser);
router.get("/suggested", getSuggestedUsers_1.getSuggestedUsers);
router.put("/update", updateUser_1.updateUser);
exports.default = router;
