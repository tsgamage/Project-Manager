import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";
import projectRoute from "./routes/project.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const PORT = process.env.PORT || 3000;

app.use("/api/project", projectRoute);

app.listen(PORT, "0.0.0.0", async () => {
  console.log("Server is running on port", PORT);
  await connectionDB();
});
