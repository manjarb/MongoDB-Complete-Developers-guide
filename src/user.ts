import { PostSchema, IPost } from "./post";
import mongoose, { Schema, Document } from "mongoose";
import { IBlogPost } from "./blogPost";

export interface IUser extends Document {
  name: string;
  postCount?: number;
  posts: IPost[];
  likes: number;
  blogPosts: IBlogPost[];
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
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogPost",
    },
  ],
});

UserSchema.virtual("postCount").get(function (this: IUser) {
  return this.posts.length;
});

UserSchema.pre<IUser>("remove", async function (next) {
  const BlogPost = mongoose.model("blogPost");
  await BlogPost.deleteMany({ _id: { $in: this.blogPosts } });
  next();
});

export const User = mongoose.model<IUser>("user", UserSchema);
