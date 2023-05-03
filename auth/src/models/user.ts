import mongoose from "mongoose";
import { PasswordHandler } from "../utils/passwordHandler";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
}

interface UserDoc extends mongoose.Document, UserAttrs {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await PasswordHandler.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }

  done();
});

userSchema.statics.build = ({ email, password }: UserAttrs) => {
  return new User({ email, password });
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
console.log({ User });

export { User };
