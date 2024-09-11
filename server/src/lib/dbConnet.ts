import mongoose from "mongoose"

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "webdev-compiler",
    });
    console.log("Connection Estalished");
  } catch (err) {
    console.log("Error connecting to server.")
  }
}