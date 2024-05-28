import type { Request, Response } from "express-serve-static-core";
import Notification from "../../models/notification-model";

export const deleteSingleNotification = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user?._id;
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    if (!userId) {
      return res.status(401).json({ error: "User not found" });
    }
    if (notification.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not allowed to delete this notification" });
    }
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ error: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotification function", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
