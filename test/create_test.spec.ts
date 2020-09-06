import { dbConnect } from "../helper/test_helper";
import mongoose from "mongoose";
import { User } from "./../src/user";
import { describe } from "mocha";

import { expect } from "chai";

describe("Creating Records", () => {
  before(async () => {
    await dbConnect();
  });

  beforeEach(async () => {
    const collections = mongoose.connection.db.listCollections({
      name: "users",
    });
    collections.next(async (err, collInfo) => {
      if (collInfo) {
        await mongoose.connection.collections.users.drop();
      }
    });
  });

  it("save a user", async () => {
    const joe = new User({ name: "joe" });
    await joe.save();
    expect(joe.isNew).to.equal(false);
  });
});
