import { expect } from "chai";
import { User } from "./../src/user";

describe("Validating Records", () => {
  it("requires a user name", async () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    if (validationResult) {
      const { message } = validationResult?.errors.name;
      expect(message).to.equal("Name is required.");
    }
  });

  it("requires a user name longer than 2 characters", () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    if (validationResult) {
      const { message } = validationResult?.errors.name;
      expect(message).to.equal("Name must be logner than 2 characters");
    }
  });

  it("disallows invalid records from being saved", async () => {
    const user = new User({ name: "Al" });
    try {
      await user.save();
    } catch (validationResult) {
      const { message } = validationResult.errors.name;
      expect(message).to.equal("Name must be logner than 2 characters");
    }
  });
});
