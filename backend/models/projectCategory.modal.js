import mongoose from "mongoose";

const projectCategorySchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    color: {type: String, required: true},
})

const ProjectCategory = mongoose.model("projectCategory", projectCategorySchema);
export default ProjectCategory;