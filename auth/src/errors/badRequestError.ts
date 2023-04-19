import { CustomError } from "./customError";
import { CommonErrorStructure } from "./types/CommonErrorStructure";

export class BadRequestError extends CustomError {
  statusCode = 500;
  serializeError(): CommonErrorStructure[] {
    throw new Error("Method not implemented.");
  }
}
