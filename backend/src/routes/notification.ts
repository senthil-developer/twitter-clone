import express from "express";
import { authProtected } from "../middleware/authProtected";
import { getNotifications } from "../controllers/notification/getNotifications";
import { deleteNotifications } from "../controllers/notification/deleteNotifications";
import { deleteSingleNotification } from "../controllers/notification/deleteSingleNotification";

const router = express.Router();

router.use(authProtected);

router.get("/", getNotifications);
router.delete("/", deleteNotifications);
router.delete("/:id", deleteSingleNotification);

export default router;
