import { Request, Response } from "express";
import * as services from "../services/sessions.js";
import { ZodError } from "zod";
import {
  createSessionDto,
  getResourceByIdParam,
  updateSessionFeedbackDto,
} from "../dtos/user.dto.js";
import { NotFoundError } from "../errors/customErrors.js";

export const createSession = async (req: Request, res: Response) => {
  const validateBody = createSessionDto.safeParse(req.body);
  if (!validateBody.success) {
    res.status(400).json({ error: validateBody.error.issues });
    return;
  }

  try {
    const data = {
      ...validateBody.data,
      menteeId: req.user!.id,
    };
    const newSession = await services.createSession(data);
    res.status(201).json({
      message: "Session has been scheduled successfully",
      session: newSession,
    });
  } catch (error) {
    console.error("Error in creating session:", error);
    res
      .status(500)
      .json({ error: "Failed to schedule session. Please, try again later" });
  }
};

export const getMentorSession = async (req: Request, res: Response) => {
  try {
    const sessions = await services.getMentorSession(req.user!.id);
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching mentor session:", error);
    res.status(500).json({
      error: "Failed to fetch mentor sessions. Please, try again later",
    });
  }
};

export const getMenteeSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await services.getMenteeSessions(req.user!.id);
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching mentee sessions:", error);
    res.status(500).json({
      error: "Failed to fetch mentee sessions. Please, try again later",
    });
  }
};

export const updateFeedbackAndRating = async (req: Request, res: Response) => {
  try {
    // Validate params and body
    const validateParam = getResourceByIdParam.safeParse(req.params);
    if (!validateParam.success) {
      res.status(400).json({ error: validateParam.error.issues });
      return;
    }
    const validateBody = updateSessionFeedbackDto.safeParse(req.body);
    if (!validateBody.success) {
      res.status(400).json({ error: validateBody.error.issues });
      return;
    }

    const sessionId = validateParam.data.id;
    const data = validateBody.data;

    const updatedRequest = await services.addSessionFeedback(sessionId, {
      ...data,
    });
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ error: "Failed to update request status" });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const validateParam = getResourceByIdParam.safeParse(req.params);
    if (!validateParam.success) {
      res.status(400).json({ error: validateParam.error.issues });
      return;
    }

    const sessionId = validateParam.data.id;
    await services.deletesession(sessionId);
    res.status(204).json({ message: "Session deleted successfully" });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }
    console.error("Error deleting session:", error);
    res.status(500).json({ error: "Failed to delete session" });
    return;
  }
};
