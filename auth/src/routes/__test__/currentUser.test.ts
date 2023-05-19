import request from "supertest";
import { app } from "../../app";

it("returns details about current user with authenticated user", async () => {
  await request(app).post("/api/users/signup").send({
    email: "test@testy.com",
    password: "123456"
  });

  const response = await request(app).get("/api/users/currentuser").expect(200);
});
