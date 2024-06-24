import { type Request, type Response } from "express-serve-static-core";
import User, { type UserTypes } from "../../models/user-model";

export const getSuggestedUsers = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const userId = req.user._id;
      // Fetch only the 'following' field
      const { following } = (await User.findById(userId)) as UserTypes;

      // Aggregate to get a sample of users excluding the current user
      const users = await User.aggregate([
        { $match: { _id: { $ne: userId } } },
        { $sample: { size: 10 } },
      ]);
      // Filter out users followed by the current user
      const suggestedUsers = users
        .filter((user) => !following.includes(user._id))
        .map(
          ({
            _id,
            username,
            email,
            fullName,
            following,
            followers,
            profileImg,
            coverImg,
            bio,
            link,
            createdAt,
            updatedAt,
            likedPosts,
          }) => ({
            _id,
            username,
            email,
            fullName,
            followers,
            following,
            profileImg,
            coverImg,
            bio,
            link,
            likedPosts,
            createdAt,
            updatedAt,
          })
        )
        .slice(0, 4) as unknown as UserTypes;

      res.json(suggestedUsers);
    }
  } catch (error) {
    console.log("Error in getSuggestedUsers: ", error);
    res.status(500).json({ error: "error" });
  }
};
