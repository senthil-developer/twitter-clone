import express from "express";
import { Request, Response } from "express-serve-static-core";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { authProtected } from "../middleware/authProtected";
import { getCurrentUser } from "../controllers/auth/getCurrentUser";
import { Verify } from "../controllers/auth/verifyAcc";
import { createAcc } from "../controllers/auth/createAcc";
import { forgetPassword } from "../controllers/auth/forgetPassword";
import { resetPassword } from "../controllers/auth/resetPassword";
import rateLimit, { ValueDeterminingMiddleware } from "express-rate-limit";

const router = express.Router();

const customKeyGenerator: ValueDeterminingMiddleware<string> = function (
  req: Request,
  res: Response
) {
  const forwardedIp = req.headers["x-forwarded-for"];
  const remoteIp = req.connection.remoteAddress;
  const ipAddress = forwardedIp || remoteIp || "unknown";
  return ipAddress.toString();
};

const authRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // Max number of requests
  keyGenerator: customKeyGenerator,
  message: {
    error: "Too many requests from this IP, please try again after a minute",
  },
});

router.get("/me", authProtected, getCurrentUser);

router.use(authRateLimit);

router.post("/signup", signup);

router.post("/login", login);
router.post("/logout", logout);

router.post("/create-account", createAcc);
router.post("/verify", Verify);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
