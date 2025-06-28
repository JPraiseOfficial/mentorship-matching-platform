import { z } from "zod";

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