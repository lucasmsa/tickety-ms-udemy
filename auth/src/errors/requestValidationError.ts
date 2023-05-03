import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    const formattedErrors = this.errors.map(({ msg, param }) => ({
      message: msg,
      field: param
    }));

    return formattedErrors;
  }
}
