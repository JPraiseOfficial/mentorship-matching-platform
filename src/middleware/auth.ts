import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
        res.status(401).json({ message: "Unauthorized User" });
        return;
    }
    console.error("Error Logging in", error)
    res.status(500).json({message: "An Unexpected error occured, please, try again later."})
  }
  next();
};
