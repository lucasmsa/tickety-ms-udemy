import { CustomError } from "./customError";
import { CommonErrorStructure } from "./types/CommonErrorStructure";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError(): CommonErrorStructure[] {
    return [
      {
        message: this.message
      }
    ];
  }
}
