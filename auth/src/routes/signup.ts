import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/badRequestError";

const router = Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({
      email,
      password
    });

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user.toJSON());
  }
);

export { router as signupRouter };
