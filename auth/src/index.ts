import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter
} from "./routes";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";
import { DatabaseConnectionError } from "./errors/databaseConnectionError";

const app = express();
const PORT = 3000;

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

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

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

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
