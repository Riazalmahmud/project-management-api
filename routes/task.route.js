const userRoute = require('express').Router();
const userController = require("../controller/task.controller");


userRoute.post("/", userController.createTask)
userRoute.get("/", userController.getAllTask)
userRoute.put("/:id", userController.updateTask)

module.exports = userRoute