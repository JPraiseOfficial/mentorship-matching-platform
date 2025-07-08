import { Request, Response } from "express";
import * as services from "../services/admin.js";
import { getResourceByIdParam, updateUserRoleDTO } from "../dtos/dtos.js";
import { Role } from "../types/types.js";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await services.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch all users", error);
    res
      .status(500)
      .json({ error: "Error fetching all users. Please, try again later." });
    return;
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const validateParam = getResourceByIdParam.safeParse(req.params);
  if (!validateParam.success) {
    res.status(400).json(validateParam.error.issues);
    return;
  }
  const validatedBody = updateUserRoleDTO.safeParse(req.body);
  if (!validatedBody.success) {
    res.status(400).json(validatedBody.error.issues);
    return;
  }

  try {
    const user = await services.updateUserRole(
      validateParam.data!.id,
      validatedBody.data!.role as Role
    );
    res.status(200).json({ message: "User's role updated successfully", user });
  } catch (error) {
    console.error("Failed to update user's role", error);
    res
      .status(500)
      .json({ error: "Error updating user's role. Please, try again later." });
  }
};
