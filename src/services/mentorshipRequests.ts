import { RequestStatus } from "@prisma/client";
import { prisma } from "../config/prisma";
import {
  createMentorshipRequest,
  MenteeMentorshipRequest,
  MentorMentorshipRequest,
} from "../types/types.js";
import { NotFoundError } from "../errors/customErrors";

export const createRequest = async (
  data: createMentorshipRequest
): Promise<MenteeMentorshipRequest> => {
  const request = await prisma.mentorshipRequest.create({
    data: {
      ...data,
    },
    include: { mentor: { include: { profile: true } } },
  });
  const requestData = {
    id: request.id,
    mentorId: request.mentorId,
    mentor: {
      name: request.mentor.profile?.name,
      bio: request.mentor.profile?.bio,
      skills: request.mentor.profile?.skills,
      goals: request.mentor.profile?.goals,
    },
    status: request.status as RequestStatus,
    createdAt: request.createdAt,
  };
  return requestData;
};

export const getSentRequests = async (
  menteeId: number
): Promise<MenteeMentorshipRequest[]> => {
  const requests = await prisma.mentorshipRequest.findMany({
    where: { menteeId },
    include: { mentor: { include: { profile: true } } },
  });
  const requestData = requests.map((request) => ({
    id: request.id,
    mentorId: request.mentorId,
    mentor: {
      name: request.mentor.profile?.name,
      bio: request.mentor.profile?.bio,
      skills: request.mentor.profile?.skills,
      goals: request.mentor.profile?.goals,
    },
    status: request.status as RequestStatus,
    createdAt: request.createdAt,
  }));
  return requestData;
};

export const getReceivedRequests = async (
  mentorId: number
): Promise<MentorMentorshipRequest[]> => {
  const requests = await prisma.mentorshipRequest.findMany({
    where: { mentorId },
    include: { mentee: { include: { profile: true } } },
  });
  const requestData = requests.map((request) => ({
    id: request.id,
    menteeId: request.menteeId,
    mentee: {
      name: request.mentee.profile?.name,
      bio: request.mentee.profile?.bio,
      skills: request.mentee.profile?.skills,
      goals: request.mentee.profile?.goals,
    },
    status: request.status as RequestStatus,
    createdAt: request.createdAt,
  }));
  return requestData;
};

export const updateRequestStatus = async (
  requestId: number,
  status: RequestStatus
): Promise<MentorMentorshipRequest> => {
  const updatedRequest = await prisma.mentorshipRequest.update({
    where: { id: requestId },
    data: { status },
    include: { mentee: { include: { profile: true } } },
  });
  const updatedRequestData = {
    id: updatedRequest.id,
    menteeId: updatedRequest.menteeId,
    mentee: {
      name: updatedRequest.mentee.profile?.name,
      bio: updatedRequest.mentee.profile?.bio,
      skills: updatedRequest.mentee.profile?.skills,
      goals: updatedRequest.mentee.profile?.goals,
    },
    status: updatedRequest.status as RequestStatus,
    createdAt: updatedRequest.createdAt,
  };
  return updatedRequestData;
};

export const deleteRequest = async (requestId: number): Promise<void> => {
  const request = await prisma.mentorshipRequest.findUnique({
    where: { id: requestId },
  });
  if (!request) {
    throw new NotFoundError("Request not found");
  }
  await prisma.mentorshipRequest.delete({
    where: { id: requestId },
  });
  return;
};
