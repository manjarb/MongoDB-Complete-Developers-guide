import { expect } from "chai";
import { Comment, IComment } from "./../src/comment";
import { BlogPost, IBlogPost } from "./../src/blogPost";
import { User, IUser } from "./../src/user";
import { dbConnect } from "./../helper/test_helper";
import mongoose from "mongoose";

describe("Middleware", () => {
  let joe: IUser, blogPost: IBlogPost;

  before(async () => {
    await dbConnect();
  });

  beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
      comments.drop(() => {
        blogposts.drop(async () => {
          joe = new User({ name: "Joe2" });
          blogPost = new BlogPost({
            title: "Jis is great2",
            content: "Yet it really is2",
          });

          joe.blogPosts.push(blogPost);

          Promise.all([joe.save(), blogPost.save()]).then(() => {
            done();
          });
        });
      });
    });
  });

  it("users clean up dangling blogposts on remove", async () => {
    await joe.remove();
    const count = await BlogPost.countDocuments();
    expect(count).to.equal(0);
  });
});
