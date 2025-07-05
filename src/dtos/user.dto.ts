import { z } from "zod";

// DTO for register user
export const createUserDto = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    role: z.enum(["Admin", "Mentor", "Mentee"])
});
export type createUserDtoType = z.infer<typeof createUserDto>;

// DTO for User Login
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


// DTOs for sending mentorship request
// This is used in the controller to validate the ID request parameters
export const MentorshipRequestParam = z.object({
    mentorId: z.coerce.number({invalid_type_error: "ID must be a number"})
});

// This is for validating the body
export const sendMentorshipRequestDto = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format" }),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: "Time must be valid in HH:mm:ss format" }),
});
export type sendMentorshipRequestDtoType = z.infer<typeof sendMentorshipRequestDto>;

// DTO for Updating Request Status by mentor
export const updateRequestStatusDto = z.object({
    status: z.enum(["Accepted", "Rejected"])
})
