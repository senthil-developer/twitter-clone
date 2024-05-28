import mongoose, { Schema, Document } from "mongoose";

export interface PostTypes extends Document {
  user: mongoose.Types.ObjectId;
  content?: string;
  img?: string;
  likes?: mongoose.Types.ObjectId[];
  comments?: {
    comment: string;
    user: mongoose.Types.ObjectId;
  }[];
}

const postSchema: Schema<PostTypes> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    img: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        comment: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
