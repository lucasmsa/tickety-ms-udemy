import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testy.com",
      password: "123456"
    })
    .expect(201);
});

it("returns 400 whenever an email is invalid", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "wrong-email",
      password: "123456"
    })
    .expect(400);
});

it("returns 400 whenever a password is invalid", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testing.com",
      password: "p"
    })
    .expect(400);
});

it("returns 400 if the request does not include the email and password fields", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ password: "123456" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@email.com" })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testy.com",
      password: "123456"
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testy.com",
      password: "123456"
    })
    .expect(400);
});

it("sets a cookie after a successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testy.com",
      password: "123456"
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
