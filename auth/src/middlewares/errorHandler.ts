import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Something went wrong", error);

  res.status(400).json({
    message: error.message
  });
}
