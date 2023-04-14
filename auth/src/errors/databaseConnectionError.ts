export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";

  constructor() {
    super();
    // Extending a built in class in TS, need to do this
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
