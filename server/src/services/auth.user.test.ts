import prismaMock from "../tests/mocks/prismaMock.js";
import bcryptMock from "../tests/mocks/bcryptMock.js";
import { makeUser, newUser } from "../tests/fixtures/users.js";

jest.mock("../config/prisma", () => ({
  prisma: prismaMock,
}));
jest.mock("bcryptjs", () => bcryptMock);

import * as services from "./auth.user.js";
import { Role } from "../types/types.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const fakeUser = makeUser();

// createUser Service Test Suite
describe("createUser service", () => {
  it("should throw error when user email already exists", async () => {
    prismaMock.user.findUnique.mockResolvedValue(fakeUser);

    await expect(
      services.createUser({
        email: fakeUser.email,
        password: "123456",
        role: "Admin",
      })
    ).rejects.toThrow("Email already exists");
  });

  it("should hash password and create user", async () => {
    const createdUser = newUser;

    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(createdUser);

    const result = await services.createUser({
      email: createdUser.email,
      password: "plain_password",
      role: "Mentor",
    });

    expect(bcryptMock.genSalt).toHaveBeenCalled();
    expect(bcryptMock.hash).toHaveBeenCalledWith("plain_password", "fake-salt");
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        email: createdUser.email,
        password: "hashedPassword",
        role: "Mentor",
      },
    });
    expect(result).toEqual({
      id: createdUser.id,
      email: createdUser.email,
      role: Role.Mentor,
    });
  });
});

// getUser Service Test Suite
describe("getUser service", () => {
  it("should return a user when found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(fakeUser);

    const result = await services.getUser(1);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(result).toEqual({
      id: fakeUser.id,
      email: fakeUser.email,
      role: Role.Admin,
    });
  });

  it("should throw Notfound error when user is not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(services.getUser(999)).rejects.toThrow("User not found");
  });
});
