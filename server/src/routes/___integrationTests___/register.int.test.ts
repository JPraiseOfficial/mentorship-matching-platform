import { prisma } from "../../config/prisma.js";
import { Role } from "@prisma/client";
import { loginAsAdmin, loginAsMentor } from "./utils/loginUtil.js";

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
