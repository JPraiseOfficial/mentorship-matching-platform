import { Request, Response } from "express";
import { createUser } from "../services/users.js";
import { createUserDto } from "../dtos/user.dto.js";
import { z } from "zod";

export const register = async (req: Request, res: Response) => {
  try {
    const validate = createUserDto.parse(req.body);
    const user = await createUser(validate);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error.issues);
    }
  }
};
