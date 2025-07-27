import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

const teamMemberSchema = mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  color: { type: String, required: true },
});

const projectSchema = mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  tasks: { type: [taskSchema], default: [] },
  team: { type: [teamMemberSchema], default: [] },
});

const Project = mongoose.model("project", projectSchema);
export default Project;