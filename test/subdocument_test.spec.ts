import mongoose from "mongoose";
import { dbConnect } from "./../helper/test_helper";
import { expect } from "chai";
import { User, IUser } from "./../src/user";

const NAME = "Joe";

describe("Subdocuments", () => {
  let joe: IUser;

  before(async () => {
    await dbConnect();
  });

  beforeEach((done) => {
    const collections = mongoose.connection.db.listCollections({
      name: "users",
    });
    collections.next(async (err, collInfo) => {
      if (collInfo) {
        mongoose.connection.collections.users.drop();
      }

      joe = new User({
        name: NAME,
        postCount: 1,
        posts: [{ title: "PostTitle" }],
      });
      await joe.save();
      done();
    });
  });

  it("can create a subdocument", async () => {
    const user = await User.findOne({ name: NAME });
    if (user) {
      expect(user.posts[0].title).to.equal("PostTitle");
    }
  });

  it("Can Add subdocuments to an existing record", async () => {
    const jane = new User({
      name: "Jane",
      posts: [],
    });

    await jane.save();
    const user = await User.findOne({ name: "Jane" });
    if (user) {
      user.posts.push({ title: "new post" } as any);
      await user.save();
      const newUser = await User.findOne({ name: "Jane" });
      if (newUser) {
        expect(newUser.posts[0].title).to.equal("new post");
      }
    }
  });

  it("can remove an existing document", async () => {
    const june = new User({
      name: "June",
      posts: [{ title: "New June title" }],
    });

    await june.save();
    const user = await User.findOne({ name: "June" });
    if (user) {
      const post = user.posts[0];
      post.remove();
      await user.save();
      const newJune = await User.findOne({ name: "June" });
      if (newJune) {
        expect(newJune.posts.length).to.equal(0);
      }
    }
  });
});
