const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName:{
        type: String,
        required: [true, "projectName must be required"],
        trim: true,
        lowercase: true,
        unique: true
    },

});

module.exports = mongoose.model('Project', ProjectSchema);