import { IComment } from "./comment";
import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  content: string;
  comments: IComment[];
}

export const BlogPostSchema: Schema<IBlogPost> = new Schema({
  title: String,
  content: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

export const BlogPost = mongoose.model<IBlogPost>("blogPost", BlogPostSchema);
