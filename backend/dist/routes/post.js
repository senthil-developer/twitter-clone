"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authProtected_1 = require("../middleware/authProtected");
const createPost_1 = require("../controllers/post/createPost");
const commentOnPost_1 = require("../controllers/post/commentOnPost");
const likeUnlikePost_1 = require("../controllers/post/likeUnlikePost");
const deletePost_1 = require("../controllers/post/deletePost");
const getLikedPost_1 = require("../controllers/post/getLikedPost");
const getFollowingPost_1 = require("../controllers/post/getFollowingPost");
const getUserPost_1 = require("../controllers/post/getUserPost");
const getAllPosts_1 = require("../controllers/post/getAllPosts");
const getBookmarkPost_1 = require("../controllers/post/getBookmarkPost");
const bookmarkUnbookmarkPost_1 = require("../controllers/post/bookmarkUnbookmarkPost");
const router = express_1.default.Router();
router.use(authProtected_1.authProtected);
router.post("/create", createPost_1.createPost);
router.post("/comment/:id", commentOnPost_1.commentOnPost);
router.post("/like/:id", likeUnlikePost_1.likeUnlikePost);
router.post("/bookmark/:id", bookmarkUnbookmarkPost_1.bookmarkUnbookmarkPost);
router.delete("/:id", deletePost_1.deletePost);
router.get("/", getAllPosts_1.getAllPosts);
router.get("/following", getFollowingPost_1.getFollowingPost);
router.get("/bookmark", getBookmarkPost_1.getBookmarkPost);
router.get("/:username/posts", getUserPost_1.getUserPost);
router.get("/:username/likes", getLikedPost_1.getLikedPost);
exports.default = router;
