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

const fakeUser: UserResponse = {
  id: 1,
  email: "test@email.com",
  role: Role.Admin,
};

// createUser Service Test Suite
describe("createUser service", () => {
  it("should throw error when user email already exists", async () => {
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

// getUser Service Test Suite
describe("getUser service", () => {
  it("should return a user when found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(fakeUser);

    const result = await services.getUser(1);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual({
      id: 1,
      email: "test@email.com",
      role: Role.Admin,
    });
  });

  it("should throw Notfound error when user is not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(services.getUser(999)).rejects.toThrow("User not found");
  });
});
