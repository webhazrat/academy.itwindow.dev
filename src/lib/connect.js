import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
