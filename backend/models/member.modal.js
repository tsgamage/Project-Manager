import mongoose from "mongoose";

const assignedProjectsSchema = mongoose.Schema({
  projectID: { type: mongoose.Schema.Types.ObjectId, required: true },
  isLead: { type: Boolean, required: true },
  task: { type: String, required: true },
})

const teamMemberSchema = mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  color: { type: String, required: true },
  assignedProjects: { type: [assignedProjectsSchema], default: [] },
});


const Member = mongoose.model("member", teamMemberSchema);
export default Member;