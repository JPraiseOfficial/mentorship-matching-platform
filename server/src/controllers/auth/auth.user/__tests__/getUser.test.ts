import { getUser } from "../auth.user.js";
import * as services from "../../../../services/auth.user/auth.user.js";
import {
  mockRequest,
  mockResponse,
} from "../../../../tests/mocks/expressMock.js";
import { Request, Response } from "express";
import { fakeUser } from "../../../../tests/fixtures/users.js";
import { NotFoundError } from "../../../../errors/customErrors.js";

jest.mock("../../../../services/auth.user/auth.user.js");

describe("getUser AuthUser Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it("should return user when found", async () => {
    (services.getUser as jest.Mock).mockResolvedValue(fakeUser);

    await getUser(req as Request, res as Response);

    expect(services.getUser).toHaveBeenCalledWith(req.user!.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeUser);
  });

  it("should handle not found error", async () => {
    const error = new NotFoundError("User not found");
    (services.getUser as jest.Mock).mockRejectedValue(error);

    await getUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found",
    });
  });

  it("should handle unexpected errors", async () => {
    (services.getUser as jest.Mock).mockRejectedValue(new Error("Unexpected"));

    await getUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred",
    });
  });
});
