import mongoose from "mongoose";

const assignedProjectsSchema = mongoose.Schema(
  {
    projectID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Project" },
    isLead: { type: Boolean, required: true },
    task: { type: String, required: true },
  },
  { timestamps: true }
);

const teamMemberSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    categoryID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "MemberCategory" },
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    color: { type: String, required: true },
    assignedProjects: { type: [assignedProjectsSchema], default: [] },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", teamMemberSchema);
export default Member;
