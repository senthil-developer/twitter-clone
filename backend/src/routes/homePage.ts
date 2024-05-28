import express from "express";
import { type Request, type Response } from "express-serve-static-core";
import User from "../models/user-model";
const app = express.Router();

app.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default app;
