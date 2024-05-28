import express from "express";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { authProtected } from "../middleware/authProtected";
import { getCurrentUser } from "../controllers/auth/getCurrentUser";

const router = express.Router();

router.get("/me", authProtected, getCurrentUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
