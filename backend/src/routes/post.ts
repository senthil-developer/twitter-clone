import express from "express";
import { authProtected } from "../middleware/authProtected";
import { createPost } from "../controllers/post/createPost";
import { commentOnPost } from "../controllers/post/commentOnPost";
import { likeUnlikePost } from "../controllers/post/likeUnlikePost";
import { deletePost } from "../controllers/post/deletePost";
import { getLikedPost } from "../controllers/post/getLikedPost";
import { getFollowingPost } from "../controllers/post/getFollowingPost";
import { getUserPost } from "../controllers/post/getUserPost";
import { getAllPosts } from "../controllers/post/getAllPosts";
import { getBookmarkPost } from "../controllers/post/getBookmarkPost";
import { bookmarkUnbookmarkPost } from "../controllers/post/bookmarkUnbookmarkPost";

const router = express.Router();

router.use(authProtected);

router.post("/create", createPost);
router.post("/comment/:id", commentOnPost);
router.post("/like/:id", likeUnlikePost);
router.post("/bookmark/:id", bookmarkUnbookmarkPost);

router.delete("/:id", deletePost);

router.get("/", getAllPosts);
router.get("/following", getFollowingPost);
router.get("/bookmark", getBookmarkPost);
router.get("/:username/posts", getUserPost);
router.get("/:username/likes", getLikedPost);

export default router;
