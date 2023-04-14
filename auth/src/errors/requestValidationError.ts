import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();
    // Extending a built in class in TS, need to do this
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
