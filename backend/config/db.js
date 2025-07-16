import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
