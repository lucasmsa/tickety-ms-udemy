import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const router = Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  const { jwt: jwtSession } = req.session || {};

  if (!jwtSession) {
    return res.send({
      currentUser: null
    });
  }

  try {
    const currentUser = jwt.verify(jwtSession, process.env.JWT_KEY!);

    return res.status(200).send({
      currentUser
    });
  } catch (error) {
    return res.send({
      currentUser: null
    });
  }
});

export { router as currentUserRouter };
