import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully", conn.connection.host);
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};