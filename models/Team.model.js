const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Tasks'
    }]
});

module.exports = mongoose.model('Teams', teamSchema);