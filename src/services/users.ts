import { prisma } from "../config/prisma.js";
import { UserResponse } from "../types/user.types.js";
import { createUserDtoType } from "../dtos/user.dto.js";
import { ResourceExistsError } from "../errors/customErrors.js";

export const createUser = async (data: createUserDtoType): Promise<UserResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new ResourceExistsError("Email already exists")
  }
  const user = await prisma.user.create({
    data,
  });
  const userdata = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  return userdata;
};
