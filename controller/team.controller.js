const { createTeamService } = require("../services/team.service");

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
  try {
    const user = await createTeamService(req.body);
    res.status(200).json({
      status: true,
      message: " created task successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      massage: "couldn't not fail create task",
      data: error.message,
    });
  }
};
