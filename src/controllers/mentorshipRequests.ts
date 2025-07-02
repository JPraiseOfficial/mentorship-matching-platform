import { Request, Response } from "express";
import * as services from "../services/mentorshipRequests.js";
import {
  sendMentorshipRequestDto,
  MentorshipRequestParam,
} from "../dtos/user.dto.js";

export const createRequest = async (req: Request, res: Response) => {
  const validateParams = MentorshipRequestParam.safeParse(req.params);
  if (!validateParams.success) {
    res.status(400).json({ error: validateParams.error.issues });
    return;
  }

  const validateBody = sendMentorshipRequestDto.safeParse(req.body);
  if (!validateBody.success) {
    res.status(400).json({ error: validateBody.error.issues });
    return;
  }

  try {
    const data = {
      mentorId: validateParams.data.mentorId,
      menteeId: req.user!.id,
      date: validateBody.data.date,
      time: validateBody.data.time,
    };
    const newRequest = await services.createRequest(data);
    res.status(201).json({
      message: "Request has been sent successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error creating mentorship request:", error);
    res.status(500).json({ error: "Failed to create mentorship request" });
  }
};
