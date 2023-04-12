import express from "express";

const app = express();
app.use(express.json());

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
