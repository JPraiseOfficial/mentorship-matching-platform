import request from "supertest";
import app from "../../../app.js";
import { loginAsMentor, loginAsAdmin } from "../utils/loginUtil.js";
import { createFakeProfile as profilePayload } from "../../../tests/fixtures/users.js";

describe("GET /api/users/me", () => {
  it("should return authenticated user's profile", async () => {
    const agent = await loginAsMentor();

    await agent.post("/api/users/newprofile").send(profilePayload);

    const res = await agent.get("/api/users/me");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("userId");
  });

  it("should return 401 for unauthenticated requests", async () => {
    const res = await request(app).get("/api/users/me");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 404 when user has no profile", async () => {
    const agent = await loginAsAdmin();

    const res = await agent.get("/api/users/me");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "User has no profile!");
  });
});
