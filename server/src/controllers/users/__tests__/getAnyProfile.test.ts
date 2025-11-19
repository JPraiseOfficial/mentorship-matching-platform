import { getAnyProfile } from "../users.js";
import * as services from "../../../services/users/users.js";
import { mockRequest, mockResponse } from "../../../tests/mocks/expressMock.js";
import { Request, Response } from "express";
import { fakeProfile } from "../../../tests/fixtures/users.js";
import { NotFoundError } from "../../../errors/customErrors.js";
import { Role } from "../../../types/types.js";
import { z } from "zod";

jest.mock("../../../services/users/users.js");

describe("getAnyProfile Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest({ user: { id: 1, role: Role.Mentee } });
    res = mockResponse();
  });

  it("should return 400 for invalid ID parameter", async () => {
    req.params = { id: "invalid" };
    const zodError = new z.ZodError([]);
    (services.getProfile as jest.Mock).mockRejectedValue(zodError);

    await getAnyProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);

    const responseArg = (res.json as jest.Mock).mock.calls[0][0];
    expect(responseArg).toHaveProperty("errors");

    const { errors } = responseArg;
    expect(errors).toMatchObject(zodError.flatten().fieldErrors);
  });

  it("should return profile for valid ID", async () => {
    req.params = { id: "2" };
    (services.getProfile as jest.Mock).mockResolvedValue(fakeProfile);

    await getAnyProfile(req as Request, res as Response);

    expect(services.getProfile).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeProfile);
  });

  it("should return 404 when profile not found", async () => {
    req.params = { id: "999" };
    const error = new NotFoundError("User has no profile!");
    (services.getProfile as jest.Mock).mockRejectedValue(error);

    await getAnyProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "User has no profile!",
    });
  });

  it("should handle unexpected errors and log to console", async () => {
    req.params = { id: "1" };
    const error = new Error("DB error");
    (services.getProfile as jest.Mock).mockRejectedValue(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await getAnyProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred. Please, try again later.",
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error getting user's profile:",
      error
    );

    consoleSpy.mockRestore();
  });
});
