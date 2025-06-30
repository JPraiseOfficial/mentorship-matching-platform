import { Request, Response } from "express";
import { createAvailabilityDto } from "../dtos/user.dto";
import * as services from "../services/mentorAvailability.js";

export const createAvailability = async (req: Request, res: Response) => {
    const validate = createAvailabilityDto.safeParse(req.body);
    if (!validate.success) {
        res.status(400).json({ error: validate.error.errors });
        return;
    }

    try {
        const user = req.user!.id;
        const availability = await services.createAvailability(user, validate.data);
        res.status(201).json({message: "Successfully created availability", availability });
    } catch (error) {
        console.error("Error creating availability:", error);
        res.status(500).json({ error: "Failed to create availability. Please, try again later." });
    }
};