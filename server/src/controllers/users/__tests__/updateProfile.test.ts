import { updateProfile } from "../users.js";
import * as services from "../../../services/users/users.js";
import { mockRequest, mockResponse } from "../../../tests/mocks/expressMock.js";
import { Request, Response } from "express";
import {
  fakeProfile,
  createFakeProfile,
} from "../../../tests/fixtures/users.js";
import { NotFoundError } from "../../../errors/customErrors.js";
import { Role } from "../../../types/types.js";
import { z } from "zod";

jest.mock("../../../services/users/users.js");

describe("updateProfile Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest({ user: { id: 1, role: Role.Mentor } });
    res = mockResponse();
  });

  it("should return 400 for invalid input", async () => {
    req.body = { name: "" };
    const zodError = new z.ZodError([]);
    (services.updateProfile as jest.Mock).mockRejectedValue(zodError);

    await updateProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);

    const responseArg = (res.json as jest.Mock).mock.calls[0][0];
    expect(responseArg).toHaveProperty("errors");

    const { errors } = responseArg;
    expect(errors).toMatchObject(zodError.flatten().fieldErrors);
  });

  it("should return 404 when profile not found", async () => {
    req.body = createFakeProfile;
    const error = new NotFoundError("User has no profile!");
    error.statusCode = 404;
    (services.updateProfile as jest.Mock).mockRejectedValue(error);

    await updateProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
    });
  });

  it("should update profile successfully", async () => {
    req.body = createFakeProfile;
    const updatedProfile = { ...fakeProfile, name: "Updated Name" };
    (services.updateProfile as jest.Mock).mockResolvedValue(updatedProfile);

    await updateProfile(req as Request, res as Response);

    expect(services.updateProfile).toHaveBeenCalledWith(
      req.user!.id,
      createFakeProfile
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User profile updated successfully",
      updatedProfile,
    });
  });

  it("should handle unexpected errors and log to console", async () => {
    req.body = createFakeProfile;
    const error = new Error("DB error");
    (services.updateProfile as jest.Mock).mockRejectedValue(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await updateProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred",
    });
    expect(consoleSpy).toHaveBeenCalledWith("Error updating profile:", error);

    consoleSpy.mockRestore();
  });
});
