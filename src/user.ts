import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: String,
});

export const User = mongoose.model<IUser>("user", UserSchema);
