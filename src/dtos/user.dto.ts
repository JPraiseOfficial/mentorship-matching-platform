import { z } from "zod";

// DTO for register and login
export const createUserDto = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    role: z.enum(["Admin", "Mentor", "Mentee"])
});
export type createUserDtoType = z.infer<typeof createUserDto>;

export const userLoginDto = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});
export type userLoginDtoType = z.infer<typeof userLoginDto>;


// DTO for user profile
export const createProfileDto = z.object({
    name: z.string().min(1, "Name is required"),
    bio: z.string().min(1, "Bio is required"),
    skills: z.string().min(1, "Skills is required"),
    goals: z.string().min(1, "Goals are required"),
});
export type createProfileDtoType = z.infer<typeof createProfileDto>;

// DTO for getting any resource by ID
// This is used in the controller to validate the ID request parameters
export const getResourceByIdParam = z.object({
    id: z.coerce.number({invalid_type_error: "ID must be a number"})
});


// Mentor Availability DTO
export const createAvailabilityDto = z.object({
    day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: "Time must be valid in HH:mm:ss format" }),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: "Time must be valid in HH:mm:ss format" }),
});
export type createAvailabilityDtoType = z.infer<typeof createAvailabilityDto>;