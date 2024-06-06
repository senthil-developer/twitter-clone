import { type Request, type Response } from "express-serve-static-core";
import User from "../../models/user-model";
import bcrypt from "bcryptjs";
import { emailRegex } from "../../lib/utils/emailRegex";
import { v2 as cloudinary } from "cloudinary";
import { userResponse } from "../../lib/utils/userResponse";

export const updateUser = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const userId: string = req.user._id;

      if (userId.length < 12) {
        return res.status(404).json({ error: "User not found" });
      }
      const {
        fullName,
        username,
        email,
        currentPassword,
        newPassword,
        bio,
        link,
      } = req.body;
      let { profileImg, coverImg } = req.body;

      if (!currentPassword) {
        return res.status(404).json({ error: "password are required" });
      }

      if (currentPassword === newPassword) {
        return res
          .status(404)
          .json({ error: "current password and new password can be same" });
      }

      if (newPassword) {
        if (newPassword.length < 8) {
          return res.status(400).json({
            error: "new password password must be at least 8 characters length",
          });
        }
      }

      if (username) {
        if (username.trim("").includes(" ")) {
          return res
            .status(400)
            .json({ error: "Username cannot contain spaces" });
        }
      }

      if (email) {
        emailRegex({ email, res });
      }

      const user = await User.findById(userId).select("+password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "username already exists use different one" });
      }

      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res
          .status(400)
          .json({ error: "email already exists use different one" });
      }

      let hashedPassword = user.password;
      newPassword && (hashedPassword = await bcrypt.hash(newPassword, 10));

      if (profileImg) {
        if (profileImg.length > 1) {
          if (user.profileImg.length > 1) {
            const publicId = user?.profileImg?.split("/")?.pop()?.split(".")[0];
            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
          }
        }

        const uploadRes = await cloudinary.uploader.upload(profileImg);
        profileImg = uploadRes.secure_url;
      }

      if (coverImg) {
        if (user.coverImg.length > 1) {
          const publicId = user?.coverImg?.split("/")?.pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        }

        const uploadRes = await cloudinary.uploader.upload(coverImg);
        coverImg = uploadRes.secure_url;
      }

      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password || ""
      );
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Wrong password" });
      } else {
        //  update user details
        user.fullName = fullName || user.fullName;
        user.username = username || user.username;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;
        user.password = hashedPassword;

        await user.save();
      }
      userResponse({ userRes: user, res });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
