import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "job_app" })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(`Error in db :${err}`);
    });
};
