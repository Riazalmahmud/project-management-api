const userRoute = require('express').Router();
const userController = require("../controller/task.controller");


userRoute.post("/", userController.createTask)

module.exports = userRoute