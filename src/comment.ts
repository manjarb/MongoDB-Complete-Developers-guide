import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

export interface IComment extends Document {
  content: string;
  user: IUser;
}

export const CommentSchema: Schema<IComment> = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Comment = mongoose.model<IComment>("comment", CommentSchema);
