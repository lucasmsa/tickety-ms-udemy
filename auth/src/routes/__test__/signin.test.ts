import request from "supertest";
import { app } from "../../app";

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@testy.com",
      password: "123456"
    })
    .expect(400);
});

it("fails when providing an incorrect password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testy.com",
      password: "123456"
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@testy.com",
      password: "123fakepassword"
    })
    .expect(400);
});

it("returns a cookie header when the user inputs the correct credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testy.com",
      password: "123456"
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@testy.com",
      password: "123456"
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
