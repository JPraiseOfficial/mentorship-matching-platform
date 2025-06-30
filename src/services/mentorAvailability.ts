import { prisma } from "../config/prisma.js";
import { createAvailabilityDtoType } from "../dtos/user.dto.js";
import { availability, Day } from "../types/user.types.js";

export const createAvailability = async (mentorId: number, data: createAvailabilityDtoType): Promise<availability> => {
    const availability = await prisma.availability.create({
        data: {
            mentorId,
            ...data
        },
    });
    const availabilityResponse: availability = {
        day: availability.day as Day,
        startTime: availability.startTime,
        endTime: availability.endTime,
    };
    return availabilityResponse;
};

