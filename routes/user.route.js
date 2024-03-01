const userRoute = require('express').Router();
const userController = require("../controller/user.controller");
const userVerifyMiddleware = require('../midelware/userVerify.middleware');
const upload = require('../midelware/imageUpload.middleware');




userRoute.put("/:id", upload.single("imageUrl"),  userController.updateUser)
userRoute.post("/singleImage", upload.single("imageUrl"),userController.uploadImage)
userRoute.post("/", userController.createUser)
userRoute.get("/", userController.getUser)
userRoute.put("/changePassword/:id",userController.changePassword)
userRoute.post("/login",userController.findUser)
userRoute.get("/me",userVerifyMiddleware, userController.getMe)
userRoute.post("/forget-password", userController.forgetPassword)
userRoute.post("/reset-password/:token", userController.resetPassword)

module.exports = userRoute