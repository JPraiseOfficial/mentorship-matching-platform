import {
  mockResponse,
  mockNext,
  mockRequest,
  mockRequestWithoutUser,
} from "../tests/mocks/expressMock.js";
import { Request, Response, NextFunction } from "express";
import { authorize } from "./authorise.js";

describe("authorise middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
  });

  it("returns 403 when no user on request", async () => {
    req = mockRequestWithoutUser;
    const middleware = authorize("Admin");

    middleware(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 403 when user's role is not allowed", async () => {
    req = mockRequest({ user: { id: 1, role: "Mentee" } });
    const middleware = authorize("Admin");

    middleware(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 403 when user's role is not allowed (multiple roles", async () => {
    req = mockRequest({ user: { id: 1, role: "Mentee" } });
    const middleware = authorize("Admin", "Mentors");

    middleware(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next when user's role is allowed (single role)", async () => {
    req = mockRequest({ user: { id: 1, role: "Admin" } });
    const middleware = authorize("Admin");

    middleware(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
  });

  it("calls next when user's role is allowed (multiple roles)", async () => {
    req = mockRequest({ user: { id: 1, role: "Mentor" } });
    const middleware = authorize("Admin", "Mentor");

    middleware(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
  });
});
