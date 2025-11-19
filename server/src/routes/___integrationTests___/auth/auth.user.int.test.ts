import request from "supertest";
import app from "../../../app.js";
import { prisma } from "../../../config/prisma.js";
import { Role } from "@prisma/client";
import { loginAsAdmin, loginAsMentor } from "../utils/loginUtil.js";

// TEST SUITES TO REGISTER A NEW USER
describe("POST /api/auth/register", () => {
  it("should allow admin to register a user after login", async () => {
    const agent = await loginAsAdmin();

    // Register new user
    const payload = {
      email: "newuser@test.com",
      password: "123456",
      role: Role.Mentee,
    };

    const res = await agent.post("/api/auth/register").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe(payload.email);

    // Delete user after test.
    await prisma.user.delete({
      where: {
        id: res.body.user.id,
      },
    });
  });

  it("returns 403 for non-admin users to register", async () => {
    const agent = await loginAsMentor();

    const payload = {
      email: "newuser@test.com",
      password: "123456",
      role: Role.Mentee,
    };

    const res = await agent.post("/api/auth/register").send(payload);

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  it("returns 400 for invalid email", async () => {
    const agent = await loginAsAdmin();

    const payload = {
      email: "not-an-email",
      password: "123456",
      role: Role.Mentee,
    };

    const res = await agent.post("/api/auth/register").send(payload);

    expect(res.status).toBe(400);
    expect(res.body.errors).toHaveProperty("email");
  });

  it("returns 409 for existing email", async () => {
    const agent = await loginAsAdmin();

    const payload = {
      email: "test@email.com",
      password: "123456",
      role: Role.Mentee,
    };

    const res = await agent.post("/api/auth/register").send(payload);

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
  });
});

// TEST SUITES TO GET CURRENTLY AUTHENTICATED USER
describe("GET /api/auth/me", () => {
  it("should return the authenticated user", async () => {
    const agent = await loginAsAdmin();

    const res = await agent.get("/api/auth/me");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("role");
  });

  it("should reject unauthenticated requests", async () => {
    const res = await request(app).get("/api/auth/me");

    expect(res.statusCode).toBe(401);

    expect(res.body).toHaveProperty("message");
  });
});
