import mongoose from 'mongoose';

const taskCategorySchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, required: true},
    projectID: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    color: {type: String, required: true},
})

const TaskCategory = mongoose.model('taskCategory', taskCategorySchema);
export default TaskCategory;