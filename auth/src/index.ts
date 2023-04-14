import express from "express";
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter
} from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(errorHandler);

app.get("/api/users/", (req, res) => {
  res.json({
    message: "✅ Server is up and running!"
  });
});

app.get("/api/users/currentuser", (req, res) => {
  res.send("hey there");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🗝️ Authentication service listening on port ${PORT}!`);
});
