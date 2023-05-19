import { Router, Request, Response } from "express";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
