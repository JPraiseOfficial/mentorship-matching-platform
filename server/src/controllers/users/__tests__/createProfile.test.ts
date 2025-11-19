import { createProfile } from "../users.js";
import * as services from "../../../services/users/users.js";
import { mockRequest, mockResponse } from "../../../tests/mocks/expressMock.js";
import { Request, Response } from "express";
import {
  fakeProfile,
  createFakeProfile,
} from "../../../tests/fixtures/users.js";
import { ResourceExistsError } from "../../../errors/customErrors.js";
import { Role } from "../../../types/types.js";
import { z } from "zod";

jest.mock("../../../services/users/users.js");

describe("createProfile Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest({ user: { id: 1, role: Role.Mentor } });
    res = mockResponse();
  });

  it("should return 400 for invalid input", async () => {
    req.body = { name: "" }; // missing required fields
    const zodError = new z.ZodError([]);
    (services.createProfile as jest.Mock).mockRejectedValue(zodError);

    await createProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);

    const responseArg = (res.json as jest.Mock).mock.calls[0][0];
    expect(responseArg).toHaveProperty("errors");

    const { errors } = responseArg;
    expect(errors).toMatchObject(zodError.flatten().fieldErrors);
  });

  it("should return 409 when user already has a profile", async () => {
    req.body = createFakeProfile;
    const error = new ResourceExistsError("User already has a Profile");
    (services.createProfile as jest.Mock).mockRejectedValue(error);

    await createProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
    });
  });

  it("should create profile successfully", async () => {
    req.body = createFakeProfile;
    (services.createProfile as jest.Mock).mockResolvedValue(fakeProfile);

    await createProfile(req as Request, res as Response);

    expect(services.createProfile).toHaveBeenCalledWith(
      req.user!.id,
      createFakeProfile
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User profile created successfully",
      profile: fakeProfile,
    });
  });

  it("should handle unexpected errors and log to console", async () => {
    req.body = createFakeProfile;
    const error = new Error("DB error");
    (services.createProfile as jest.Mock).mockRejectedValue(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await createProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred",
    });
    expect(consoleSpy).toHaveBeenCalledWith("Error creating profile:", error);

    consoleSpy.mockRestore();
  });
});
