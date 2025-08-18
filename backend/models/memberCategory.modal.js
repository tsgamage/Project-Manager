import mongoose from "mongoose";

const memberCategorySchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

const MemberCategory = mongoose.model("MemberCategory", memberCategorySchema);
export default MemberCategory;
