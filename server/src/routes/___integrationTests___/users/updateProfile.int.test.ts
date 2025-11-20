import request from "supertest";
import app from "../../../app.js";
import { loginAsMentor, loginAsAdmin } from "../utils/loginUtil.js";
import { updatedFakeProfile as updatedPayload } from "../../../tests/fixtures/users.js";

describe("PUT /api/users/me/profile", () => {
  it("should update profile successfully", async () => {
    const agent = await loginAsMentor();

    const res = await agent.put("/api/users/me/profile").send(updatedPayload);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "User profile updated successfully"
    );
    expect(res.body.updatedProfile).toHaveProperty("name", updatedPayload.name);
  });

  it("should return 400 for invalid input", async () => {
    const agent = await loginAsMentor();

    const res = await agent.put("/api/users/me/profile").send({ name: "" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return 401 for unauthenticated requests", async () => {
    const res = await request(app)
      .put("/api/users/me/profile")
      .send(updatedPayload);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 404 when user has no profile", async () => {
    const agent = await loginAsAdmin();

    const res = await agent.put("/api/users/me/profile").send(updatedPayload);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "User has no profile!");
  });
});
