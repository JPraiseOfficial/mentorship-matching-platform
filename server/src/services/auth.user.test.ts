import * as services from "./auth.user.js";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { Role, UserResponse } from "../types/types.js";

jest.mock("../config/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  genSalt: jest.fn().mockResolvedValue("fake-salt"),
  hash: jest.fn().mockResolvedValue("hashedPassword"),
}));

describe("Create user service", () => {
  it("should throw error when user email already exists", async () => {
    const fakeUser: UserResponse = {
      id: 1,
      email: "test@email.com",
      role: Role.Admin,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(fakeUser);

    await expect(
      services.createUser({
        email: "test@email.com",
        password: "123456",
        role: "Admin",
      })
    ).rejects.toThrow("Email already exists");
  });

  it("should hash password and create user", async () => {
    const user: UserResponse = {
      id: 1,
      email: "newuser@email.com",
      role: Role.Mentor,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue(user);

    const result = await services.createUser({
      email: "newuser@email.com",
      password: "plain_password",
      role: "Mentor",
    });

    expect(bcrypt.genSalt).toHaveBeenCalled;
    expect(bcrypt.hash).toHaveBeenCalledWith("plain_password", "fake-salt");
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: "newuser@email.com",
        password: "hashedPassword",
        role: "Mentor",
      },
    });
    expect(result).toEqual({
      id: 1,
      email: "newuser@email.com",
      role: "Mentor",
    });
  });
});
