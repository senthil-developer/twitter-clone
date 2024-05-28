import type { UserTypes } from "../../models/user-model";
import { Response } from "express-serve-static-core";

type Props = {
  userRes: UserTypes;
  res: Response;
};

export const userResponse = ({ userRes, res }: Props) => {
  return res.status(200).json({
    _id: userRes._id,
    username: userRes.username,
    email: userRes.email,
    password: "",
    fullName: userRes.fullName,
    followers: userRes.followers,
    following: userRes.following,
    profileImg: userRes.profileImg,
    coverImg: userRes.coverImg,
    bio: userRes.bio,
    link: userRes.link,
    likedPosts: userRes.likedPosts,
    createdAt: userRes.createdAt,
    updatedAt: userRes.updatedAt,
  });
};
