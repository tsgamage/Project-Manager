import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";
import Project from "./models/projects.model.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const projects = Project.find();
  res.send("<center><h1>Hello Princess</h1></center>");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port", PORT);
  connectionDB();
});
