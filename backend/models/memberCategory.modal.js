import mongoose from 'mongoose';

const memberCategorySchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    color: {type: String, required: true},
})

const MemberCategory = mongoose.model('memberCategory', memberCategorySchema);
export default MemberCategory;