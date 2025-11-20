import request from "supertest";
import app from "../../../app.js";
import TestAgent from "supertest/lib/agent";

export async function loginAsAdmin(): Promise<TestAgent> {
  const agent = request.agent(app);

  await agent
    .post("/api/auth/login")
    .send({ email: "test@email.com", password: "123456" })
    .expect(200);

  return agent;
}

export async function loginAsMentor(): Promise<TestAgent> {
  const agent = request.agent(app);

  await agent
    .post("/api/auth/login")
    .send({ email: "testmentor@email.com", password: "mentor123" })
    .expect(200);

  return agent;
}

export async function loginAsMentee(): Promise<TestAgent> {
  const agent = request.agent(app);

  await agent
    .post("/api/auth/login")
    .send({ email: "testmentee@email.com", password: "mentee123" })
    .expect(200);

  return agent;
}
