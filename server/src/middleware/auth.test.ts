import jwtMock from "../tests/mocks/jwtMock.js";
jest.mock("jsonwebtoken", () => jwtMock);

import {
  mockResponse,
  mockNext,
  mockRequestWithoutUser,
} from "../tests/mocks/expressMock.js";
import { Request, Response, NextFunction } from "express";
import { auth } from "./auth.js";

describe("auth middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;

  beforeEach(() => {
    req = mockRequestWithoutUser;
    res = mockResponse();
    next = mockNext();
  });

  it("responds 401 when no token present", async () => {
    req.cookies = {}; // ensure no token

    await auth(req as Request, res as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized User" });
    expect(next).not.toHaveBeenCalled();
  });

  it("responds 401 when jwt.verify throws JsonWebTokenError", async () => {
    req.cookies = { jwtToken: "bad" };
    jwtMock.verify.mockImplementation(() => {
      throw new jwtMock.JsonWebTokenError("invalid token");
    });
    await auth(req as Request, res as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized User" });
    expect(next).not.toHaveBeenCalled();
  });

  it("responds 500 when jwt.verify throws unexpected error and prints error to the console", async () => {
    req.cookies = { jwtToken: "bad" };

    const unexpectedError = new Error("Unexpected");
    jwtMock.verify.mockImplementation(() => {
      throw unexpectedError;
    });

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await auth(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An Unexpected error occured, please, try again later.",
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error Logging in",
      unexpectedError
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("sets req.user and calls next on valid token", async () => {
    req.cookies = { jwtToken: "good" };
    jwtMock.verify.mockReturnValue({ id: "1", role: "Admin" });

    await auth(req as Request, res as Response, next as NextFunction);
    // req.user should be set and next called
    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 1, role: "Admin" });
  });
});
