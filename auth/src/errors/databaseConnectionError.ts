import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError {
  statusCode = 503;
  reason = "Error connecting to database";

  constructor() {
    super("Error connecting to db");
    // Extending a built in class in TS, need to do this
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }];
  }
}
