import { Role } from "../types/user.types.js";
import { prisma } from "../config/prisma.js";
import { GetAllUsersType } from "../types/admin.types.js";
import { UserResponse } from "../types/user.types.js";

export const getAllUsers = async (): Promise<GetAllUsersType[]> => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { profile: true },
  });
  const usersData = users.map(user => ({
    id: user.id,
    name: user.profile?.name,
    email: user.email,
    role: user.role
  }));
  return usersData
};

export const updateUserRole = async (id: number, role: Role): Promise<UserResponse> => {
  const user = await prisma.user.update({
    where: {id},
    data: {role}
  })
  const updatedUser = {
    id: user.id,
    email: user.email,
    role: user.role as Role
  }
  return updatedUser
}