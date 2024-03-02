
const User = require("../models/User.model")

exports.createTeamService = async(user)=>{
const users = await User.create(user)
return users
}