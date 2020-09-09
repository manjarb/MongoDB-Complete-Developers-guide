import { User, IUser } from "./../src/user";
import { dbConnect } from "../helper/test_helper";
import mongoose from "mongoose";
import { describe } from "mocha";
import { expect } from "chai";

const NAME = "joe";

describe("Creating Records", () => {
  let joe: IUser, maria: IUser, alex: IUser, zach: IUser;
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
      maria = new User({ name: "maria" });
      alex = new User({ name: "alex" });
      zach = new User({ name: "zach" });

      Promise.all([joe.save(), maria.save(), alex.save(), zach.save()]).then(
        () => {
          done();
        }
      );
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

  it("can skip and limit the result set", async () => {
    const users = await User.find({}).sort({ name: 1 }).skip(1).limit(2);
    console.log(users, " eo");
    expect(users.length).to.equal(2);
    expect(users[0].name).to.equal("joe");
    expect(users[1].name).to.equal("maria");
  });
});
