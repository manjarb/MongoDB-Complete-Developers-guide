import { expect } from "chai";
import { Comment, IComment } from "./../src/comment";
import { BlogPost, IBlogPost } from "./../src/blogPost";
import { User, IUser } from "./../src/user";
import { dbConnect } from "./../helper/test_helper";
import mongoose from "mongoose";

describe("Association", () => {
  let joe: IUser, blogPost: IBlogPost, comment: IComment;

  before(async () => {
    await dbConnect();
  });

  beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
      comments.drop(() => {
        blogposts.drop(async () => {
          joe = new User({ name: "Joe" });
          blogPost = new BlogPost({
            title: "Jis is great",
            content: "Yet it really is",
          });
          comment = new Comment({
            content: "Contcarets is cearo",
          });

          joe.blogPosts.push(blogPost);
          blogPost.comments.push(comment);
          comment.user = joe;

          Promise.all([joe.save(), blogPost.save(), comment.save()]).then(
            () => {
              done();
            }
          );
        });
      });
    });
  });

  it("saves a relation between a user and a blogpost", async () => {
    const user = await User.findOne({ name: "Joe" }).populate("blogPosts");
    if (user) {
      expect(user.blogPosts[0].title).to.equal("Jis is great");
    }
  });

  it("save a full relation graph", async () => {
    const user = await User.findOne({ name: "Joe" }).populate({
      path: "blogPosts",
      populate: {
        path: "comments",
        model: "comment",
        populate: {
          path: "user",
          model: "user",
        },
      },
    });

    expect(user?.name).to.equal("Joe");
    expect(user?.blogPosts[0].title).to.equal("Jis is great");
    expect(user?.blogPosts[0].comments[0].content).to.equal(
      "Contcarets is cearo"
    );
    expect(user?.blogPosts[0].comments[0].user.name).to.equal("Joe");
  });
});
