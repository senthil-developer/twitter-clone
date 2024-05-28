import type { Request, Response } from "express-serve-static-core";
import Notification from "../../models/notification-model";

export const deleteNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    await Notification.deleteMany({ toUser: userId });
    res.status(200).json({ error: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications function", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
