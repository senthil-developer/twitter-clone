import { type Request, type Response } from "express-serve-static-core";

export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).json({ error: "login first" });
    }
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ error: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
