import mongoose from "mongoose";
import { DatabaseConnectionError } from "./errors/databaseConnectionError";
import { app } from "./app";

const PORT = 3000;

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
