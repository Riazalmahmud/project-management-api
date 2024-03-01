const userRoute = require('express').Router();
const teamController = require("../controller/team.controller");


userRoute.post("/", teamController.createTeam)

module.exports = userRoute