const userRoute = require('express').Router();
const userController = require("../controller/project.controller");
userRoute.post("/", userController.createProject)
userRoute.get("/", userController.getAllProject)

module.exports = userRoute