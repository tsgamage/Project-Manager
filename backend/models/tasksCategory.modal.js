import mongoose from "mongoose";

const taskCategorySchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    projectID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Project" },
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

const TaskCategory = mongoose.model("TaskCategory", taskCategorySchema);
export default TaskCategory;
