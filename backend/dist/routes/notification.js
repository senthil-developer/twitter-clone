"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authProtected_1 = require("../middleware/authProtected");
const getNotifications_1 = require("../controllers/notification/getNotifications");
const deleteNotifications_1 = require("../controllers/notification/deleteNotifications");
const deleteSingleNotification_1 = require("../controllers/notification/deleteSingleNotification");
const router = express_1.default.Router();
router.use(authProtected_1.authProtected);
router.get("/", getNotifications_1.getNotifications);
router.delete("/", deleteNotifications_1.deleteNotifications);
router.delete("/:id", deleteSingleNotification_1.deleteSingleNotification);
exports.default = router;
