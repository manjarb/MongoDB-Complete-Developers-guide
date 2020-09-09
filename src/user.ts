import { PostSchema, IPost } from "./post";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  postCount?: number;
  posts: IPost[];
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name: string) => name.length > 2,
      message: "Name must be logner than 2 characters",
    },
    required: [true, "Name is required."],
  },
  postCount: Number,
  posts: [PostSchema],
});

export const User = mongoose.model<IUser>("user", UserSchema);
