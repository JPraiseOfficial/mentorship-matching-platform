import { z } from "zod";

export const createUserDto = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    role: z.enum(["admin", "mentor", "mentee"])
});
export type createUserDtoType = z.infer<typeof createUserDto>;
