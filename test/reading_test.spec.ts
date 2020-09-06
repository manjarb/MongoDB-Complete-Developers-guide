import { User, IUser } from "./../src/user";
import { dbConnect } from "../helper/test_helper";
import mongoose from "mongoose";
import { describe } from "mocha";
import { expect } from "chai";

const NAME = "Joe";

describe("Creating Records", () => {
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

  it("find all users with a name of joe", async () => {
    const users = await User.find({ name: NAME });
    expect(users[0]._id.toString()).to.equal(joe._id.toString());
  });

  it("find one user with a particular id", async () => {
    const user = await User.findOne({ id: joe._id });
    if (user) {
      expect(user.name).to.equal(joe.name);
    }
  });
});
