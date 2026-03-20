import { prisma } from "../../config/prisma.js";
import bcrypt from "bcryptjs";
import { Role, UserResponse } from "../../types/types.js";
import { createUserDtoType } from "../../dtos/dtos.js";
import {
  NotFoundError,
  ResourceExistsError,
} from "../../errors/customErrors.js";
import { env } from "../../config/env.js";

// This function creates a new user
export const createUser = async (
  data: createUserDtoType
): Promise<UserResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new ResourceExistsError("Email already exists");
  }
  const hashpassword = await bcrypt.hash(data.password, env.BCRYPT_SALT_ROUNDS || 10);
  data.password = hashpassword;
  const user = await prisma.user.create({
    data,
  });
  const userdata: UserResponse = {
    id: user.id,
    email: user.email,
    role: user.role as Role,
  };
  return userdata;
};

// This function retrieves the currently authenticated user
export const getUser = async (userId: number): Promise<UserResponse | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const userResponse: UserResponse = {
    id: user.id,
    email: user.email,
    role: user.role as Role,
  };
  return userResponse;
};
