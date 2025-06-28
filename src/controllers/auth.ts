import { Request, Response } from "express";
import { createUser } from "../services/users.js";
import { createUserDto, userLoginDto } from "../dtos/user.dto.js";
import { z } from "zod";
import { ResourceExistsError } from "../errors/customErrors.js";

// Function to handle user registration
export const register = async (req: Request, res: Response) => {
  try {
    const validate = createUserDto.parse(req.body);
    const user = await createUser(validate);
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