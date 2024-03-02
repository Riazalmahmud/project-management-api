const { createProjectService, getAllProjectService } = require("../services/project.service");


/** Register a new user
 * Post:  http://localhost:3000/api/v1/Projects
 * @param: {
  "projectName": "",
}
*/
exports.createProject = async (req, res, next) => {
  try {
    const user = await createProjectService(req.body);
    res.status(200).json({
      status: true,
      message: " created project successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      massage: "couldn't not fail create project",
      data: error.message,
    });
  }
};


/** Register a new user
 * Post:  http://localhost:3000/api/v1/Projects
 * @param: {
  "projectName": "",
}
*/
exports.getAllProject = async (req, res, next) => {
  try {
    const user = await getAllProjectService();
    res.status(200).json({
      status: true,
      message: " created project successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      massage: "couldn't not fail create project",
      data: error.message,
    });
  }
};
