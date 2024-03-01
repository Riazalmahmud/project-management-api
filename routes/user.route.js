const userRoute = require('express').Router();
const userController = require("../controller/user.controller");
const userVerifyMiddleware = require('../midelware/userVerify.middleware');




userRoute.post("/", userController.createUser)
userRoute.get("/", userController.getUser)
userRoute.put("/changePassword/:id",userController.changePassword)
userRoute.post("/login",userController.findUser)
userRoute.get("/me",userVerifyMiddleware, userController.getMe)
userRoute.post("/forget-password", userController.forgetPassword)
userRoute.post("/reset-password/:token", userController.resetPassword)

module.exports = userRoute