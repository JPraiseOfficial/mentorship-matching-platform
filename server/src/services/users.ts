import { prisma } from "../config/prisma.js";
import { createProfileDtoType } from "../dtos/dtos.js";
import { NotFoundError, ResourceExistsError } from "../errors/customErrors.js";
import { fullUserProfile, UserProfile } from "../types/types.js";

// Function to create a new profile
export const createProfile = async (
  userId: number,
  data: createProfileDtoType
): Promise<UserProfile> => {
  const checkIfProfileExists = await prisma.profile.findUnique({
    where: { userId },
  });
  if (checkIfProfileExists) {
    throw new ResourceExistsError("User already has a Profile");
  }

  const profile = await prisma.profile.create({
    data: {
      ...data,
      user: {
        connect: { id: userId },
      },
    },
  });
  return profile;
};

export const getProfile = async (userId: number): Promise<fullUserProfile> => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { user: true },
  });
  if (!profile) {
    throw new NotFoundError("User has no profile!");
  }
  const profileData = {
    id: profile.id,
    name: profile.name,
    bio: profile.bio,
    skills: profile.skills,
    goals: profile.goals,
    role: profile.user.role,
    userId: profile.userId,
  };
  return profileData;
};

export const updateProfile = async (
  userId: number,
  data: createProfileDtoType
): Promise<UserProfile> => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });
  if (!profile) {
    throw new NotFoundError("User has no profile!");
  }

  const updatedProfile = await prisma.profile.update({
    where: { userId },
    data: {
      ...data,
    },
  });
  return updatedProfile;
};
