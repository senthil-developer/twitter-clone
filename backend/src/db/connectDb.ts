import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const MONGO_URI =
      process.env.NODE_ENV === "development"
        ? "mongodb://localhost:27017"
        : process.env.MONGO_URI;
    const conn = await mongoose.connect(MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.port}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
