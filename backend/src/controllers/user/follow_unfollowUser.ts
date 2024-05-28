import { type Request, type Response } from "express-serve-static-core";
import user from "../../models/user-model";
import { Types } from "mongoose";
import Notification from "../../models/notification-model";

export const follow_unFollowUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const toActionId = await user.findById(id);

    if (req.user) {
      console.log(req.user._id.toString(), "from current");
      console.log(id, "from params");
      const currentUser = await user.findById(req.user._id);

      if (!currentUser || !toActionId) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      if (id === req.user._id.toString()) {
        return res.status(400).json({
          error: "You cannot follow yourself",
        });
      }
      const following = currentUser.following.includes(
        id as unknown as Types.ObjectId
      );
      if (following) {
        await user.findByIdAndUpdate(id, {
          $pull: { followers: req.user._id },
        });
        await user.findByIdAndUpdate(req.user._id, {
          $pull: { following: id },
        });
        res.status(200).json({ data: "User unFollowed successFully" });
      } else {
        await user.findByIdAndUpdate(id, {
          $push: { followers: req.user._id },
        });
        await user.findByIdAndUpdate(req.user._id, {
          $push: { following: id },
        });
        const newNotification = new Notification({
          type: "follow",
          fromUser: id,
          toUser: toActionId._id,
        });
        await newNotification.save();
        res.status(200).json({ data: "User followed successFully" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
    });
  }
};
