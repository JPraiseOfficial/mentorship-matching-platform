import { prisma } from "../config/prisma.js";
import { createAvailabilityDtoType } from "../dtos/dtos.js";
import { NotFoundError } from "../errors/customErrors.js";
import { Availability, Day } from "../types/types.js";

export const createAvailability = async (
  mentorId: number,
  data: createAvailabilityDtoType
): Promise<Availability> => {
  const availability = await prisma.availability.create({
    data: {
      mentorId,
      ...data,
    },
  });
  const availabilityResponse: Availability = {
    id: availability.id,
    day: availability.day as Day,
    startTime: availability.startTime,
    endTime: availability.endTime,
  };
  return availabilityResponse;
};

export const getAvailability = async (
  mentorId: number
): Promise<Availability[]> => {
  const availability = await prisma.availability.findMany({
    where: { mentorId },
  });
  if (!availability || availability.length === 0) {
    return [];
  }
  const response: Availability[] = availability.map((item) => ({
    id: item.id,
    day: item.day as Day,
    startTime: item.startTime,
    endTime: item.endTime,
  }));
  return response;
};

export const deleteAvailability = async (id: number) => {
  const availability = await prisma.availability.delete({
    where: { id },
  });
  return;
};

export const deleteAllAvailability = async (mentorId: number) => {
  await prisma.availability.deleteMany({
    where: { mentorId },
  });
  return;
};
