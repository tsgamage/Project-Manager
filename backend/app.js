import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/project.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import memberRoutes from "./routes/member.route.js";
import categoryRoutes from "./routes/category.route.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const __dirname = path.resolve();

// Initialize the app
const app = express();

// Connect to database
connectDB();

// Handle CORS requests
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Third-party middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/project", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/category", categoryRoutes);

app.use("*", notFound);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.all("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Error handler middleware
app.use(errorHandler);

export default app;
