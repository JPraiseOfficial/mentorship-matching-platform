import request from "supertest";
import app from "../../app.js";

describe("POST /api/auth/login", () => {
  it("logs in a user successfully", async () => {
    const payload = {
      email: "test@email.com",
      password: "123456",
    };

    const res = await request(app).post("/api/auth/login").send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");

    // Check if cookie was set
    expect(res.headers["set-cookie"]).toBeDefined();

    const cookie = res.headers["set-cookie"][0];
    expect(cookie).toMatch(/jwtToken=/);
    expect(cookie).toMatch(/HttpOnly/);
  });

  it("returns 401 for invalid email or password", async () => {
    const payload = {
      email: "test@email.com",
      password: "123456789",
    };

    const res = await request(app).post("/api/auth/login").send(payload);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Invalid email or password");
  });
});
