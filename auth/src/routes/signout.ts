import { Router } from "express";

const router = Router();

router.post("/api/users/signout", (req, res) => {
  res.json({
    "🛀🏻": "📷"
  });
});

export { router as signoutRouter };
