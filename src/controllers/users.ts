import { createProfileDto, getResourceByIdParam } from "../dtos/user.dto.js";
import { NotFoundError, ResourceExistsError } from "../errors/customErrors.js";
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
            res.status(error.statusCode).json({message: error.message});
            return
        }
        console.error("Error creating profile:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id
        const profile = await services.getProfile(userId)
        res.status(200).json(profile)
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.statusCode).json({message: error.message})
            return
        }
        console.error("Error getting user's profile:", error);
        res.status(500).json({ message: "An unexpected error occurred. Please, try again later." });
    }
}

export const getAnyProfile = async (req: Request, res: Response) => {
    const validate = getResourceByIdParam.safeParse(req.params);
    if (!validate.success) {
        res.status(400).json({ errors: validate.error.issues });
        return;
    }

    try {
        const userId = validate.data.id;
        const profile = await services.getProfile(userId);
        res.status(200).json(profile);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.statusCode).json({message: error.message})
            return;
        }
        console.error("Error getting user's profile:", error);
        res.status(500).json({ message: "An unexpected error occurred. Please, try again later." });
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    const validate = createProfileDto.safeParse(req.body);
    if (!validate.success) {
        res.status(400).json({ errors: validate.error.issues });
        return;
    }

    try {
        const userId = req.user!.id;
        const profileData = validate.data; // Use the validated data
        const updatedProfile = await services.updateProfile(userId, profileData);
        res.status(200).json({message: "User profile updated successfully", updatedProfile});
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.statusCode).json({message: error.message});
            return;
        }
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};