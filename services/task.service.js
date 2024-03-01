
const Task = require("../models/Task.model")

exports.createTaskService = async(task)=>{
const taskData = await Task.create(task)
return taskData
}