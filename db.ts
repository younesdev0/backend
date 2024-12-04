import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) {
  console.error("BASE_URL is not defined in the environment variables.");
  process.exit(1);
}
export const connectDB = async () => {
  try {
    const uri = BASE_URL
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
