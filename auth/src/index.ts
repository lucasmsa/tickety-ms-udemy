import express from "express";
import "express-async-errors";
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter
} from "./routes";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";
import { DatabaseConnectionError } from "./errors/databaseConnectionError";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.get("/api/users/", (req, res) => {
  res.json({
    message: "✅ Server is up and running!"
  });
});

app.get("/api/users/currentuser", (req, res) => {
  res.send("hey there");
});

const startup = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("🦾 Connected to MongoDB!");
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError();
  }

  app.listen(PORT, () => {
    console.log(`🗝️ Authentication service listening on port ${PORT}!`);
  });
};

startup();
