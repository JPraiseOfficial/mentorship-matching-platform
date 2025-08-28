import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { MyJwtPayload } from "../types/types.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    res.status(401).json({ message: "Unauthorized User" });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as MyJwtPayload;
    req.user = {
      id: Number(decoded.id),
      role: decoded.role,
    };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Unauthorized User" });
      return;
    }
    console.error("Error Logging in", error);
    res.status(500).json({
      message: "An Unexpected error occured, please, try again later.",
    });
  }
};
