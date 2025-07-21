import { Request, Response } from "express";
import { userLoginDto } from "../../dtos/dtos.js";
import { prisma } from "../../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

// Function to generate JWT token
const generateJwtToken = (userId: number, role: string) => {
  const token = jwt.sign({ id: userId, role }, env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

// Function to handle user login
export const login = async (req: Request, res: Response) => {
  const validatedBody = userLoginDto.safeParse(req.body);
  if (!validatedBody.success) {
    res.status(400).json(validatedBody.error.issues);
    return;
  }

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: validatedBody.data.email },
    });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      validatedBody.data.password,
      user.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT token
    const token = generateJwtToken(user.id, user.role);

    // Sends the token in a cookie
    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during user login:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please, try again later." });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the JWT token cookie
    res.clearCookie("jwtToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during user logout:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please, try again later." });
  }
};
