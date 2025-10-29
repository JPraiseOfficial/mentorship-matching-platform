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
