import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/users_test");
mongoose.connection
  .once("open", () => console.log("good to go"))
  .on("error", (error) => console.warn("Warning: ", error));
