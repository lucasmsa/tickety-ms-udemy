import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .send({ errors: error.serializeError() });
  }

  res.status(500).send({
    message: error.message || "Something went wrong"
  });
}
