import { Router } from "express";

const router = Router();

router.get("/api/users/currentuser", (req, res) => {
  res.json({
    "🛀🏻": "📷"
  });
});

export { router as currentUserRouter };
