import { prisma } from "../config/prisma.js";
import { createAvailabilityDtoType } from "../dtos/user.dto.js";

export const createAvailability = async (mentorId: number, data: createAvailabilityDtoType) => {
    const availability = await prisma.availability.create({
        data: {
            mentorId,
            ...data
        },
    });
    return availability;
};

