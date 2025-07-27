import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";
import cors from "cors";
import projectRoutes from "./routes/project.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const PORT = process.env.PORT || 3000;

app.use("/api/project", projectRoutes);
app.use("/api/auth/", authRoutes);

app.listen(PORT, async () => {
  await connectionDB();
  console.log("Server is running on port", PORT);
});
