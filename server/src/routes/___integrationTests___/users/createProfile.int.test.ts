import request from "supertest";
import app from "../../../app.js";
import { loginAsMentor, loginAsAdmin } from "../utils/loginUtil.js";
import { createFakeProfile } from "../../../tests/fixtures/users.js";
import { prisma } from "../../../config/prisma.js";

describe("POST /api/users/newprofile", () => {
  const profilePayload = createFakeProfile;

  it("should create profile successfully", async () => {
    const agent = await loginAsAdmin();

    const res = await agent.post("/api/users/newprofile").send(profilePayload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("profile");

    // Delete profile after test.
    await prisma.profile.delete({
      where: {
        id: res.body.profile.id,
      },
    });
  });

  it("should return 400 for invalid input", async () => {
    const agent = await loginAsMentor();

    const res = await agent.post("/api/users/newprofile").send({ name: "" }); // missing required fields

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return 401 for unauthenticated requests", async () => {
    const res = await request(app)
      .post("/api/users/newprofile")
      .send(profilePayload);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 409 when user already has a profile", async () => {
    const agent = await loginAsMentor();

    await agent.post("/api/users/newprofile").send(profilePayload);

    const res = await agent.post("/api/users/newprofile").send(profilePayload);

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message", "User already has a Profile");
  });
});
