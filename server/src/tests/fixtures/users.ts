import {
  MentorResponse,
  Role,
  UserProfile,
  UserResponse,
} from "../../types/types.js";
import { createProfileDtoType } from "../../dtos/dtos.js";
import { Profile, User } from "@prisma/client";

export const fakeUser = {
  id: 1,
  email: "test@email.com",
  role: Role.Admin,
};

export const newUser = {
  id: 2,
  email: "newuser@email.com",
  role: Role.Mentor,
};

export const createFakeProfile: createProfileDtoType = {
  name: "Test User",
  bio: "Test Bio",
  skills: ["JavaScript", "TypeScript"],
  goals: "Test goals",
};

export const fakeProfile: UserProfile = {
  id: 1,
  ...createFakeProfile,
  userId: 1,
};

export const createUpdatedFakeProfile: createProfileDtoType = {
  name: "Updated Test User",
  bio: "Updated Test Bio",
  skills: ["JavaScript", "TypeScript", "HTML"],
  goals: "Updated Test goals",
};

export const updatedFakeProfile: UserProfile = {
  id: 1,
  ...createUpdatedFakeProfile,
  userId: 1,
};

export const mentor = {
  id: 1,
  email: "test@email.com",
  role: Role.Mentor,
};

export const mockMentors: (UserResponse & { profile: UserProfile })[] = [
  {
    ...mentor,
    profile: {
      ...fakeProfile,
    },
  },
];

export const mockMentorResponse: MentorResponse[] = [
  {
    mentorId: 1,
    name: "Test User",
    bio: "Test Bio",
    skills: ["JavaScript", "TypeScript"],
  },
];
