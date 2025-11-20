import request from "supertest";
import app from "../../../app.js";
import { loginAsMentee, loginAsMentor } from "../utils/loginUtil.js";

describe("GET /api/users/mentor", () => {
  it("should return all mentors for mentee", async () => {
    const agent = await loginAsMentee();

    const res = await agent.get("/api/users/mentor");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 401 for unauthenticated requests", async () => {
    const res = await request(app).get("/api/users/mentor");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 403 for non-mentee users", async () => {
    const agent = await loginAsMentor();

    const res = await agent.get("/api/users/mentor");

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message", "Forbidden");
  });
});
