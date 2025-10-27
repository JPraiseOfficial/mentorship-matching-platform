import { Role, UserResponse } from "../../types/types.js";

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
