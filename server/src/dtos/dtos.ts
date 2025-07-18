import { z } from "zod";

// DTO for register user
export const createUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.enum(["Admin", "Mentor", "Mentee"]),
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
  skills: z.array(z.string()).min(1, "Skills is required"),
  goals: z.string().min(1, "Goals are required"),
});
export type createProfileDtoType = z.infer<typeof createProfileDto>;

// DTO for getting any resource by ID
// This is used in the controller to validate the ID request parameters
export const getResourceByIdParam = z.object({
  id: z.coerce.number({ invalid_type_error: "ID must be a number" }),
});

// Mentor Availability DTO
export const createAvailabilityDto = z.object({
  day: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
      message: "Time must be valid in HH:mm:ss format",
    }),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
      message: "Time must be valid in HH:mm:ss format",
    }),
});
export type createAvailabilityDtoType = z.infer<typeof createAvailabilityDto>;

// DTOs for sending mentorship request
// This is used in the controller to validate the ID request parameters
export const MentorshipRequestParam = z.object({
  mentorId: z.coerce.number({ invalid_type_error: "ID must be a number" }),
});

// DTO for Updating Request Status by mentor
export const updateRequestStatusDto = z.object({
  status: z.enum(["Accepted", "Rejected"]),
});

// DTO to create a new session.
export const createSessionDto = z.object({
  mentorId: z.number({ invalid_type_error: "ID must be a number" }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format",
    }),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
      message: "Time must be valid in HH:mm:ss format",
    }),
});
export type createSessionDto = z.infer<typeof createSessionDto>;

// DTO to add session feedback after session.
export const updateSessionFeedbackDto = z.object({
  rating: z
    .number({ message: "Please, rate the session on the scale of 1-5" })
    .max(5),
  feedback: z
    .string()
    .min(20, { message: "Please, leave a comment about the session" }),
});
export type updateSessionFeedbackDtoType = z.infer<
  typeof updateSessionFeedbackDto
>;

// DTO for admin to update user role
export const updateUserRoleDTO = z.object({
  role: z.enum(["Admin", "Mentor", "Mentee"]),
});
