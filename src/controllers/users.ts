import { createProfileDto } from "../dtos/user.dto.js";
import { ResourceExistsError } from "../errors/customErrors.js";
import * as services from "../services/users.js";
import { Request, Response } from "express";

// Function to create user profile
export const createProfile = async (req: Request, res: Response) => {
    const validate = createProfileDto.safeParse(req.body);
    if (!validate.success) {
        res.status(400).json({ errors: validate.error.issues });
        return
    }
    
    try {
        const userId = req.user!.id;
        const profileData = validate.data; // Use the validated data
        const profile = await services.createProfile(userId, profileData);
        res.status(201).json({message: "User profile created successfully", profile});
    } catch (error) {
        if (error instanceof ResourceExistsError) {
            res.status(error.statusCode).json({error: error.message});
            return
        }
        console.error("Error creating profile:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};