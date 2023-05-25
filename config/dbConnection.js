import {} from "dotenv/config";
import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect(`${process.env.DATABASE_URL}`, {});
  //   mongoose.connection.once('open', (err) => {
  //       if (err) {
  //           console.log(err)
  //       } else {
  //          console.log(`Database Connected Successfully`)
  //       }
  //   })
  mongoose.connection.on("connected", () => {
    console.log("Mongo has connected succesfully");
  });
  mongoose.connection.on("reconnected", () => {
    console.log("Mongo has reconnected");
  });
  mongoose.connection.on("error", (error) => {
    console.log("Mongo connection has an error", error);
    mongoose.disconnect();
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongo connection is disconnected");
  });
};
