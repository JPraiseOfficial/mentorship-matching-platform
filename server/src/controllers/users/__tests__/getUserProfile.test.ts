import { getUserProfile } from "../users.js";
import * as services from "../../../services/users/users.js";
import { mockRequest, mockResponse } from "../../../tests/mocks/expressMock.js";
import { Request, Response } from "express";
import { fakeProfile } from "../../../tests/fixtures/users.js";
import { NotFoundError } from "../../../errors/customErrors.js";
import { Role } from "../../../types/types.js";

jest.mock("../../../services/users/users.js");

describe("getUserProfile Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest({ user: { id: 1, role: Role.Mentor } });
    res = mockResponse();
  });

  it("should return user profile successfully", async () => {
    (services.getProfile as jest.Mock).mockResolvedValue(fakeProfile);

    await getUserProfile(req as Request, res as Response);

    expect(services.getProfile).toHaveBeenCalledWith(req.user!.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeProfile);
  });

  it("should return 404 when profile not found", async () => {
    const error = new NotFoundError("User has no profile!");
    error.statusCode = 404;
    (services.getProfile as jest.Mock).mockRejectedValue(error);

    await getUserProfile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
    });
  });

  it("should handle unexpected errors and log to console", async () => {
    const error = new Error("DB error");
    (services.getProfile as jest.Mock).mockRejectedValue(error);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await getUserProfile(req as Request, res as Response);

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
