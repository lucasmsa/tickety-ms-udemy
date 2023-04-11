import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🗝️ Authentication service listening on port ${PORT}!`);
});
