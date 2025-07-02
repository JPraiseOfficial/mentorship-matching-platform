import { Request, Response } from "express";
import * as services from "../services/mentorshipRequests.js";
import {
  sendMentorshipRequestDto,
  MentorshipRequestParam,
  updateRequestStatusDto,
  getResourceByIdParam,
} from "../dtos/user.dto.js";
import { ZodError } from "zod";

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

export const getSentRequests = async (req: Request, res: Response) => {
  try {
    const requests = await services.getSentRequests(req.user!.id);
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching sent requests:", error);
    res.status(500).json({ error: "Failed to fetch sent requests" });
  }
};

export const getReceivedRequests = async (req: Request, res: Response) => {
  try {
    const requests = await services.getReceivedRequests(req.user!.id);
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching received requests:", error);
    res.status(500).json({ error: "Failed to fetch received requests" });
  }
};

export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    // Validate params and body
    const validateParam = getResourceByIdParam.safeParse(req.params);
    if (!validateParam.success) {
      res.status(400).json({ error: validateParam.error.issues });
      return;
    }
    const validateBody = updateRequestStatusDto.safeParse(req.body);
    if (!validateBody.success) {
      res.status(400).json({ error: validateBody.error.issues });
      return;
    }

    const requestId = validateParam.data.id;
    const { status } = validateBody.data;

    const updatedRequest = await services.updateRequestStatus(
      requestId,
      status
    );
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ error: "Failed to update request status" });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    const validateParam = getResourceByIdParam.safeParse(req.params);
    if (!validateParam.success) {
      res.status(400).json({ error: validateParam.error.issues });
      return
    }

    const requestId = validateParam.data.id;

    await services.deleteRequest(requestId);
    res.status(204).json({message: "Request successfully deleted"});
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ error: "Failed to delete request" });
    return
  }
};
