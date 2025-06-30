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