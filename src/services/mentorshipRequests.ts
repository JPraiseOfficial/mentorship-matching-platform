import { RequestStatus } from "@prisma/client";
import { prisma } from "../config/prisma";
import { createMentorshipRequest, MentorshipRequest } from "../types/user.types.js";
import { NotFoundError } from "../errors/customErrors";

export const createRequest = async (data: createMentorshipRequest): Promise<MentorshipRequest> => {
  const request = await prisma.mentorshipRequest.create({
    data: {
      ...data,
    },
    include: { mentor: true }
  });
  return request;
};

export const getSentRequests = async (menteeId: number): Promise<MentorshipRequest[]> => {
  const requests = await prisma.mentorshipRequest.findMany({
    where: { menteeId },
    include: { mentor: true }
  });
  return requests;
}

export const getReceivedRequests = async (mentorId: number): Promise<MentorshipRequest[]> => {
  const requests = await prisma.mentorshipRequest.findMany({
    where: { mentorId },
    include: { mentee: true}
  });
  return requests;
};

export const updateRequestStatus = async (requestId: number, status: RequestStatus): Promise<MentorshipRequest> => {
  const updatedRequest = await prisma.mentorshipRequest.update({
    where: { id: requestId },
    data: { status },
    include: {mentee: true}
  });
  return updatedRequest;
};

export const deleteRequest = async (requestId: number): Promise<void> => {
  const request = await prisma.mentorshipRequest.findUnique({
    where: {id: requestId},
  })
  if (!request) {
    throw new NotFoundError("Request not found")
  }
  await prisma.mentorshipRequest.delete({
    where: { id: requestId },
  });
  return;
};