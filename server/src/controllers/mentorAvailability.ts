import { Request, Response } from "express";
import { createAvailabilityDto, getResourceByIdParam } from "../dtos/dtos.js";
import * as services from "../services/mentorAvailability.js";
import { NotFoundError } from "../errors/customErrors.js";

export const createAvailability = async (req: Request, res: Response) => {
  const validate = createAvailabilityDto.safeParse(req.body);
  if (!validate.success) {
    res.status(400).json({ error: validate.error.errors });
    return;
  }

  try {
    const user = req.user!.id;
    const availability = await services.createAvailability(user, validate.data);
    res
      .status(201)
      .json({ message: "Successfully created availability", availability });
  } catch (error) {
    console.error("Error creating availability:", error);
    res
      .status(500)
      .json({
        error: "Failed to create availability. Please, try again later.",
      });
  }
};

// Get Mentor availability either by user ID or current user
// If mentor ID is provided in the request params, it fetches availability for that user else it provides availability for the current mentor.
export const getAvailability = async (req: Request, res: Response) => {
  let user: number;
  if (req.params.id) {
    const validate = getResourceByIdParam.safeParse(req.params);
    if (!validate.success) {
      res.status(400).json({ error: validate.error.errors });
      return;
    }
    user = validate.data.id;
  } else {
    user = req.user!.id;
  }

  try {
    const availability = await services.getAvailability(user);
    res
      .status(200)
      .json({ message: "Successfully fetched availability", availability });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res
      .status(500)
      .json({
        error: "Failed to fetch availability. Please, try again later.",
      });
  }
};

export const deleteAvailability = async (req: Request, res: Response) => {
  const validate = getResourceByIdParam.safeParse(req.params);
  if (!validate.success) {
    res.status(400).json({ error: validate.error.errors });
    return;
  }

  try {
    await services.deleteAvailability(validate.data.id);
    res.status(200).json({ message: "Successfully deleted availability" });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    console.error("Error deleting availability:", error);
    res
      .status(500)
      .json({
        error: "Failed to delete availability. Please, try again later.",
      });
  }
};

export const deleteAllAvailability = async (req: Request, res: Response) => {
  try {
    const user = req.user!.id;
    await services.deleteAllAvailability(user);
    res.status(200).json({ message: "Successfully deleted all availability" });
  } catch (error) {
    console.error("Error deleting all availability:", error);
    res
      .status(500)
      .json({
        error: "Failed to delete all availability. Please, try again later.",
      });
  }
};
