import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  taskID: { type: String, required: true },
  taskName: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  tasks: { type: [taskSchema], default: [] },
});

const Project = mongoose.model("project", projectSchema);
export default Project;
