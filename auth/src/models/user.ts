import mongoose from "mongoose";

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

userSchema.statics.build = ({ email, password }: UserAttrs) => {
  return new User({ email, password });
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
console.log({ User })

export { User };
