import { prisma } from "../config/prisma";
import { updateSessionFeedbackDtoType } from "../dtos/dtos";
import { NotFoundError } from "../errors/customErrors";
import {
  createSessionType,
  MenteeSession,
  MentorSession,
} from "../types/types.js";

export const createSession = async (
  data: createSessionType
): Promise<MenteeSession> => {
  const dateTime = new Date(`${data.date}T${data.time}Z`);
  const session = await prisma.session.create({
    data: {
      mentorId: data.mentorId,
      menteeId: data.menteeId,
      DateTime: dateTime,
    },
    include: { mentor: { include: { profile: true } } },
  });
  const returndata = {
    id: session.id,
    mentorId: session.mentorId,
    menteeId: session.menteeId,
    dateTime: session.DateTime,
    mentor: {
      name: session.mentor.profile?.name,
      skills: session.mentor.profile?.skills,
    },
    createdAt: session.createdAt,
  };
  return returndata;
};

export const getMenteeSessions = async (
  menteeId: number
): Promise<MenteeSession[]> => {
  const sessions = await prisma.session.findMany({
    where: { menteeId },
    include: { mentor: { include: { profile: true } } },
  });
  const sessionData = sessions.map((session) => ({
    id: session.id,
    mentorId: session.mentorId,
    menteeId: session.menteeId,
    dateTime: session.DateTime,
    mentor: {
      name: session.mentor.profile?.name,
      skills: session.mentor.profile?.skills,
    },
    createdAt: session.createdAt,
    feedback: session.feedback,
    rating: session.rating,
  }));
  return sessionData;
};

export const getMentorSession = async (
  mentorId: number
): Promise<MentorSession[]> => {
  const sessions = await prisma.session.findMany({
    where: { mentorId },
    include: { mentee: { include: { profile: true } } },
  });
  const sessionData = sessions.map((session) => ({
    id: session.id,
    mentorId: session.mentorId,
    menteeId: session.menteeId,
    dateTime: session.DateTime,
    mentee: {
      name: session.mentee.profile?.name,
      skills: session.mentee.profile?.skills,
    },
    createdAt: session.createdAt,
    feedback: session.feedback,
    rating: session.rating,
  }));
  return sessionData;
};

export const addSessionFeedback = async (
  sessionId: number,
  data: updateSessionFeedbackDtoType
): Promise<MenteeSession> => {
  const updatedsession = await prisma.session.update({
    where: { id: sessionId },
    data: { ...data },
    include: { mentor: { include: { profile: true } } },
  });
  const returndata = {
    id: updatedsession.id,
    mentorId: updatedsession.mentorId,
    menteeId: updatedsession.menteeId,
    dateTime: updatedsession.DateTime,
    feedback: updatedsession.feedback,
    rating: updatedsession.rating,
    mentor: {
      name: updatedsession.mentor.profile?.name,
      skills: updatedsession.mentor.profile?.skills,
    },
    createdAt: updatedsession.createdAt,
  };
  return returndata;
};

export const deletesession = async (sessionId: number): Promise<void> => {
  const request = await prisma.mentorshipRequest.findUnique({
    where: { id: sessionId },
  });
  if (!request) {
    throw new NotFoundError("Request not found");
  }

  await prisma.session.delete({
    where: { id: sessionId },
  });
  return;
};
