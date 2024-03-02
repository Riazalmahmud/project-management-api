
const Project = require("../models/Project.model")

exports.createProjectService = async(project)=>{
const projectData = await Project.create(project)
return projectData
}
exports.getAllProjectService = async()=>{
const projectData = await Project.find({})
return projectData
}