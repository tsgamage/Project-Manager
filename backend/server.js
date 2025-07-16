import express from "express";
import dotenv from "dotenv";
import {connectionDB} from "./config/db.js";
import projectRoute from "./routes/project.route.js";

const app = express();
app.use(express.json())
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/api/project", projectRoute)

app.listen(PORT, "0.0.0.0", async () => {
    console.log("Server is running on port", PORT);
    await connectionDB();
});