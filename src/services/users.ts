import { prisma } from "../config/prisma.js";
import { createProfileDtoType } from "../dtos/user.dto.js";
import { ResourceExistsError } from "../errors/customErrors.js";
import { UserProfile } from "../types/user.types.js";

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

