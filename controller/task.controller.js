const { createTaskService, getAllTaskService, updateTaskService } = require("../services/task.service");

/** create mew task 
 * Post:  http://localhost:3000/api/v1/task
 * @param: {
  "title": "Task 1",
  "description": "This is the first task",
  "assignedTask": "6099d7c2736e873e50a2053f", // Assuming this is a valid ObjectId of a user
  "status": "todo",
  "deadline": "2024-03-15T12:00:00.000Z",
  "priority": "low"
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
      massage: "couldn't not  create task",
      data: error.message,
    });
  }
};
/** create mew task 
 * get:  http://localhost:3000/api/v1/task
}
*/
exports.getAllTask = async (req, res, next) => {
  try {
    const user = await getAllTaskService();
    res.status(200).json({
      status: true,
      message: " get all task successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      massage: "couldn't not  get all task",
      data: error.message,
    });
  }
};


/** update task
 * put:  http://localhost:3000/api/v1/task/65e292f2c179e540be924718
 * * @param: {
  "title": "Task 1",
  "description": "This is the first task",
  "assignedTask": "6099d7c2736e873e50a2053f", // Assuming this is a valid ObjectId of a user
  "status": "todo",
  "deadline": "2024-03-15T12:00:00.000Z",
  "priority": "low"
  "statusStag": 2
}
}
*/
exports.updateTask = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await updateTaskService(id, req.body);
    res.status(200).json({
      status: true,
      message: " Update task successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      massage: "couldn't not  update task",
      data: error.message,
    });
  }
};
