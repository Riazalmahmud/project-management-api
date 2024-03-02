const { createTeamService } = require("../services/team.service");
const User = require("../models/User.model");
/** Register a new user
 * Post:  http://localhost:3000/api/v1/team
 * @param: {
 "name": "Development Team",
  "description": "A team responsible for software development projects",
  "members": ["6099d7c2736e873e50a2053f", "6099d7c2736e873e50a20540"],
  "tasks": ["6099d7c2736e873e50a20541", "6099d7c2736e873e50a20542"]
}
*/
exports.createTeam = async (req, res, next) => {
  const parentUsers = req.body.parentUserId
  try {
    const users = await createTeamService(req.body);
    console.log(users)
    const find = await User.find({_id:users._id});
    console.log(find)
    find.teams.push(team._id)
    find.save()
    res.status(200).json({
      status: true,
      message: " created task successfully",
      data: team,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      massage: "couldn't not fail create task",
      data: error.message,
    });
  }
};
