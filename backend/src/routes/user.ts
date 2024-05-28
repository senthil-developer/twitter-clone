import express from "express";
import { updateUser } from "../controllers/user/updateUser";
import { authProtected } from "../middleware/authProtected";
import { getUserProfile } from "../controllers/user/getUserProfile";
import { follow_unFollowUser } from "../controllers/user/follow_unfollowUser";
import { getSuggestedUsers } from "../controllers/user/getSuggestedUsers";

const router = express.Router();

router.use(authProtected);

router.get("/profile/:username", getUserProfile);
router.post("/follow/:id", follow_unFollowUser);
router.get("/suggested", getSuggestedUsers);
router.put("/update", updateUser);

export default router;
