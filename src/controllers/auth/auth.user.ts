import { Request, Response } from "express";
import * as services from "../../services/auth.user.js";
import { createUserDto } from "../../dtos/user.dto.js";
import { z } from "zod";
import {
  NotFoundError,
  ResourceExistsError,
} from "../../errors/customErrors.js";

// Function to handle user registration
export const register = async (req: Request, res: Response) => {
  try {
    const validate = createUserDto.parse(req.body);
    const user = await services.createUser(validate);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error.issues);
      return;
    }
    if (error instanceof ResourceExistsError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please, try again later." });
  }
};

// Function to get the currently authenticated user
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await services.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
