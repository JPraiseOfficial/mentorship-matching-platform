import { register } from "../auth.user.js";
import * as services from "../../../../services/auth.user/auth.user.js";
import {
  mockRequest,
  mockResponse,
} from "../../../../tests/mocks/expressMock.js";
import { Request, Response } from "express";
import { fakeUser } from "../../../../tests/fixtures/users.js";
import { z } from "zod";
import { ResourceExistsError } from "../../../../errors/customErrors.js";

jest.mock("../../../../services/auth.user/auth.user.js");

describe("register Auth User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  const registerUser = {
    email: "test@email.com",
    password: "password123",
    role: "Admin",
  };

  it("should register user successfully", async () => {
    req.body = registerUser;
    const createdUser = fakeUser;
    (services.createUser as jest.Mock).mockResolvedValue(createdUser);

    await register(req as Request, res as Response);

    expect(services.createUser).toHaveBeenCalledWith(registerUser);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User Registered successfully",
      user: createdUser,
    });
  });

  it("should handle validation errors", async () => {
    req.body = { email: "invalid" };
    const zodError = new z.ZodError([]);
    (services.createUser as jest.Mock).mockRejectedValue(zodError);

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);

    const responseArg = (res.json as jest.Mock).mock.calls[0][0];
    expect(responseArg).toHaveProperty("errors");

    const { errors } = responseArg;
    expect(errors).toMatchObject(zodError.flatten().fieldErrors);
  });

  it("should handle existing user error", async () => {
    req.body = registerUser;
    const error = new ResourceExistsError("Email already exists");
    error.statusCode = 409;
    (services.createUser as jest.Mock).mockRejectedValue(error);

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
    });
  });

  it("should handle unexpected errors and log to console", async () => {
    req.body = registerUser;
    const error = new Error("Unexpected");
    (services.createUser as jest.Mock).mockRejectedValue(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something went wrong. Please, try again later.",
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error during user registration:",
      error
    );

    consoleSpy.mockRestore();
  });
});
