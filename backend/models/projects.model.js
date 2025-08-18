import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    taskCategory: { type: mongoose.Schema.Types.ObjectId, required: true },
    taskName: { type: String, required: true },
    completed: { type: Boolean, required: true },
    taskDescription: { type: String, required: true },
  },
  { timestamps: true }
);

const projectSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tasks: { type: [taskSchema], default: [] },
    team: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
