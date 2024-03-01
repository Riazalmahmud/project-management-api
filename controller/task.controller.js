const { createTaskService } = require("../services/task.service");

/** Register a new user
 * Post:  http://localhost:3000/api/v1/task
 * @param: {
  "title": "Task 1",
  "description": "This is the first task",
  "assignedTo": "6099d7c2736e873e50a2053f", // Assuming this is a valid ObjectId of a user
  "status": "todo",
  "deadline": "2024-03-15T12:00:00.000Z"
}
*/
exports.createTask = async (req, res, next) => {
  try {
    const user = await createTaskService(req.body);
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
