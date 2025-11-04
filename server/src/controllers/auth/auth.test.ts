import prismaMock from "../../tests/mocks/prismaMock.js";
import bcryptMock from "../../tests/mocks/bcryptMock.js";
import jwtMock from "../../tests/mocks/jwtMock.js";

jest.mock("../../config/prisma", () => ({
  prisma: prismaMock,
}));
jest.mock("bcryptjs", () => bcryptMock);
jest.mock("jsonwebtoken", () => jwtMock);

import { login, logout } from "./auth.js";
import { mockRequest, mockResponse } from "../../tests/mocks/expressMock.js";
import { Request, Response } from "express";
import { env } from "../../config/env.js";

describe("Auth Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  describe("login", () => {
    const validCredentials = {
      email: "test@test.com",
      password: "password123",
    };

    it("should return 400 for invalid input", async () => {
      req.body = { email: "invalid-email" };

      await login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);

      const responseArg = (res.json as jest.Mock).mock.calls[0][0];
      const keys = Object.keys(responseArg);

      expect(keys.some((key) => ["email", "password"].includes(key))).toBe(
        true
      );

      keys.forEach((key) => {
        if (["email", "password"].includes(key)) {
          expect(Array.isArray(responseArg[key])).toBe(true);
        }
      });
    });

    it("should return 401 when user not found", async () => {
      req.body = validCredentials;
      prismaMock.user.findUnique.mockResolvedValue(null);

      await login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email or password",
      });
    });

    it("should return 401 for invalid password", async () => {
      req.body = validCredentials;
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: validCredentials.email,
        password: "hashedPassword",
      });
      bcryptMock.compare.mockResolvedValue(false);

      await login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email or password",
      });
    });

    it("should login successfully and set cookie", async () => {
      req.body = validCredentials;
      const mockUser = {
        id: 1,
        email: validCredentials.email,
        password: "hashedPassword",
        role: "Admin",
      };

      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      bcryptMock.compare.mockResolvedValue(true);

      await login(req as Request, res as Response);

      expect(jwtMock.sign).toHaveBeenCalledWith(
        { id: mockUser.id, role: mockUser.role },
        env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      expect(res.cookie).toHaveBeenCalledWith(
        "jwtToken",
        "fake-jwt-token",
        expect.any(Object)
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("logout", () => {
    it("should clear jwt cookie and return success", async () => {
      await logout(req as Request, res as Response);

      expect(res.clearCookie).toHaveBeenCalledWith("jwtToken");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Logout successful",
      });
    });
  });
});
