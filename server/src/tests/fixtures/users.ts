import { Role, UserProfile, UserResponse } from "../../types/types.js";
import { createProfileDtoType } from "../../dtos/dtos.js";

export const makeUser = (overrides: Partial<UserResponse> = {}) => ({
  id: 1,
  email: "test@email.com",
  role: Role.Admin,
  ...overrides,
});

export const newUser = {
  id: 2,
  email: "newuser@email.com",
  role: Role.Mentor,
};

export const mockProfile: UserProfile = {
  id: 1,
  name: "Test User",
  bio: "Test Bio",
  skills: ["JavaScript", "TypeScript"],
  goals: "Test goals",
  userId: 1,
};

export const newFakeProfile: createProfileDtoType = {
  name: "Test User",
  bio: "Test Bio",
  skills: ["JavaScript", "TypeScript"],
  goals: "Test goals",
};
