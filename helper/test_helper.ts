import mongoose from "mongoose";

export const dbConnect = async () => {
  await mongoose.connect("mongodb://localhost:27017/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  await mongoose.connection
    .once("open", () => console.log("good to go"))
    .on("error", (error) => console.warn("Warning: ", error));
};
