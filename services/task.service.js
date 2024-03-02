
const Task = require("../models/Task.model")

exports.createTaskService = async(task)=>{
const taskData = await Task.create(task)
return taskData
}
exports.getAllTaskService = async()=>{
const taskData = await Task.find({})
return taskData
}
exports.updateTaskService = async(id, data)=>{
const taskData = await Task.updateOne({_id: id}, data)
return taskData
}