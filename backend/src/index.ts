import express from "express";
import { Request, Response } from "express-serve-static-core";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import notification from "./routes/notification";
import auth from "./routes/auth";
import user from "./routes/user";
import post from "./routes/post";
import connectDb from "./db/connectDb";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import "dotenv/config";

const app = express();

const Port = process.env.PORT || 5000;

app.use(morgan("dev"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/posts", post);
app.use("/api/notification", notification);

app.get("/", (req: Request, res: Response) => {
  res.send(path.join(__dirname, "..", "public", "404.html"));
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, "..", "public", "404.html"));
});

app.listen(Port, () => {
  connectDb();
  console.log(`Server is running on port ${Port}`);
});

export default app;
