
const Team = require("../models/Team.model")

exports.createTeamService = async(team)=>{
const TeamData = await Team.create(team)
return TeamData
}