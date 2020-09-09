import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
}

export const PostSchema = new Schema({
  title: String,
});
