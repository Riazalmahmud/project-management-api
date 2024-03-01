const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: String,
    description: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Teams', teamSchema);