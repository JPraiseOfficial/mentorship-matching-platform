import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { UserResponse } from "../types/user.types.js";
import { createUserDtoType } from "../dtos/user.dto.js";
import { ResourceExistsError } from "../errors/customErrors.js";

export const createUser = async (
  data: createUserDtoType
): Promise<UserResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new ResourceExistsError("Email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(data.password, salt);
  data.password = hashpassword;
  const user = await prisma.user.create({
    data
  });
  const userdata: UserResponse = {
    id: user.id,
    email: user.email,
    role: user.role as 'Mentor' | 'Mentee' | 'Admin',
  };
  return userdata;
};
