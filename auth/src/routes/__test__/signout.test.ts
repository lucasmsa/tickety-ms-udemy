import request from "supertest";
import { app } from "../../app";

function getCookieSessionValue(response: any) {
  const cookieString = response.get("Set-Cookie")[0];
  const cookieSessionValue = cookieString.split("session=")[1].split(";")[0];

  return cookieSessionValue;
}

it("clears the session on successful signout", async () => {
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testy.com",
      password: "123456"
    })
    .expect(201);

  expect(getCookieSessionValue(signupResponse)).toBeTruthy();

  const signoutResponse = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(getCookieSessionValue(signoutResponse)).toBeFalsy();
});
