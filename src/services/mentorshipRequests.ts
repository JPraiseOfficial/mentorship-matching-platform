import { RequestStatus } from "@prisma/client";
import { prisma } from "../config/prisma";
import { createMentorshipRequest, MentorshipRequest } from "../types/user.types";

export const createRequest = async (data: createMentorshipRequest): Promise<MentorshipRequest> => {
  const dateTime = new Date(`${data.date}T${data.time}Z`); // Combine date and time into a Date object
  const request = await prisma.mentorshipRequest.create({
    data: {
      ...data,
      date: dateTime,
    },
  });
  return request;
};

