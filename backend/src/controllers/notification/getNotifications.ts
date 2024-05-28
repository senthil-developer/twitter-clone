import type { Request, Response } from "express-serve-static-core";
import Notification from "../../models/notification-model";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const notifications = await Notification.find({ toUser: userId }).populate({
      path: "fromUser",
      select: "username profileImg",
    });
    await Notification.updateMany({ toUser: userId }, { read: true });
    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications function", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
