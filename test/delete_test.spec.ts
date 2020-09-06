import { User, IUser } from "./../src/user";
import { dbConnect } from "../helper/test_helper";
import mongoose from "mongoose";
import { describe } from "mocha";
import { expect } from "chai";

const NAME = "Joe";

describe("Deleting a User", () => {
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

      joe = new User({ name: NAME });
      await joe.save();
      done();
    });
  });

  it("model Instance Remove", async () => {
    await joe.deleteOne();
    const user = await User.findOne({ name: NAME });
    expect(user).to.equal(null);
  });

  it("class method Remove", async () => {
    await User.deleteMany({ name: NAME });
    const user = await User.findOne({ name: NAME });
    expect(user).to.equal(null);
  });

  it("class method findOneAndRemove", async () => {
    await User.findOneAndRemove({ name: NAME });
    const user = await User.findOne({ name: NAME });
    expect(user).to.equal(null);
  });

  it("class method findByIdAndRemove", async () => {
    await User.findByIdAndRemove(joe._id);
    const user = await User.findOne({ name: NAME });
    expect(user).to.equal(null);
  });
});
