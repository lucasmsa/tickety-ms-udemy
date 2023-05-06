import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { body } from "express-validator";
import { Request, Response, Router } from "express";
import { BadRequestError } from "../errors/badRequestError";
import { PasswordHandler } from "../utils/passwordHandler";

const router = Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be supplied")
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordsMatch = await PasswordHandler.compare(
      user.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

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

    res.status(200).send(user.toJSON());
  }
);

export { router as signinRouter };
