const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  assignedTask: { type: Schema.Types.ObjectId, ref: "Users" },
  status: {
    type: String,
    enum: ["todo", "inprogress", "completed", "done"],
    default: "todo",
  },
  statusStag: { type: Number, enum: [1, 2, 3, 4], default: 1 },
  deadline: Date,
  priority: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('Tasks', taskSchema);