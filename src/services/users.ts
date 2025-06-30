import { prisma } from "../config/prisma.js";
import { createProfileDtoType } from "../dtos/user.dto.js";
import { NotFoundError, ResourceExistsError } from "../errors/customErrors.js";
import { fullUserProfile, UserProfile } from "../types/user.types.js";

// Function to create a new profile
export const createProfile = async (userId: number, data: createProfileDtoType): Promise<UserProfile> => {
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
                connect: { id: userId }
            }
        }
    });
    const profileData = {
        name: profile.name,
        bio: profile.bio,
        skills: profile.skills,
        goals: profile.goals
    }
    return profileData;
}

export const getProfile = async (userId: number): Promise<fullUserProfile> => {
    const profile = await prisma.profile.findUnique({
        where: { userId },
        include: {user: true }
    });
    if (!profile) {
        throw new NotFoundError("User has no profile!");
    }
    const profileData = {
        name: profile.name,
        bio: profile.bio,
        skills: profile.skills,
        goals: profile.goals,
        role: profile.user.role
    }
    return profileData;
}