import { prisma } from "../config/prisma.js";
import { UserResponse } from "../types/user.types.js";
import { createUserDtoType } from "../dtos/user.dto.js";

export const createUser = async (data: createUserDtoType): Promise<UserResponse> => {
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
