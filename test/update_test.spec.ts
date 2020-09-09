import { User, IUser } from "./../src/user";
import { dbConnect } from "../helper/test_helper";
import mongoose from "mongoose";
import { describe } from "mocha";
import { expect } from "chai";

const NAME = "Joe";

describe("Update a User", () => {
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

      joe = new User({ name: NAME, likes: 1 });
      await joe.save();
      done();
    });
  });

  it("instance type using set ane save", async () => {
    const name = "Alex";
    joe.set("name", name);
    await joe.save();
    await assertName(name);
  });

  it("A model instance can update", async () => {
    const name = "Alex";
    await joe.updateOne({ name: name });
    assertName(name);
  });

  it("A model Class can update", async () => {
    const name = "AAA";
    await User.updateMany({ name: "Joe" }, { name });
    await assertName(name);
  });

  it("A model Class can update one record", async () => {
    const name = "XXX";
    await User.updateOne({ name: "Joe" }, { name });
    await assertName(name);
  });

  it("A model Class can find a record with an Id and Update", async () => {
    const name = "CCC";
    await User.findByIdAndUpdate(joe._id, { name });
    await assertName(name);
  });

  it("A user can have their post count increase by 1", async () => {
    await User.updateMany({ name: NAME }, { $inc: { likes: 10 } });
    const user = await User.findOne({ name: NAME });
    if (user) {
      expect(user?.likes).to.equal(11);
    }
  });

  async function assertName(name: string) {
    const users = await User.find();
    expect(users.length).to.equal(1);
    expect(users[0].name).to.equal(name);
  }
});
