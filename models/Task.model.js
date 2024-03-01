const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    description: String,
    assignedTo: { type: Schema.Types.ObjectId, ref: 'Users' },
    status: { type: String, enum: ['todo', 'inprogress', 'completed', 'done'], default: 'todo' },
    deadline: Date,
});

module.exports = mongoose.model('Tasks', taskSchema);