import request from "supertest";
import app from "../../../app.js";
import { loginAsMentee } from "../utils/loginUtil.js";
import { fakeUser } from "../../../tests/fixtures/users.js";

describe("GET /api/users/:id", () => {
  it("should return profile for valid user ID with profile", async () => {
    const agent = await loginAsMentee();

    // Get a mentor's profile
    const res = await agent.get(`/api/users/${fakeUser.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
  });

  it("should return 400 for invalid ID parameter", async () => {
    const agent = await loginAsMentee();

    const res = await agent.get("/api/users/invalid");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return 401 for unauthenticated requests", async () => {
    const res = await request(app).get("/api/users/1");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 404 when user has no profile", async () => {
    const agent = await loginAsMentee();

    const res = await agent.get("/api/users/999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "User has no profile!");
  });
});
