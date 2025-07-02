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

export const getSentRequests = async (menteeId: number): Promise<MentorshipRequest[]> => {
  const requests = await prisma.mentorshipRequest.findMany({
    where: {
      menteeId: menteeId,
    },
  });
  return requests;
}

export const getReceivedRequests = async (mentorId: number): Promise<MentorshipRequest[]> => {
  const requests = await prisma.mentorshipRequest.findMany({
    where: {
      mentorId: mentorId,
    },
  });
  return requests;
};
