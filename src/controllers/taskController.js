const taskService = require('../services/taskService');

class TaskController {
  /**
   * Handle POST /tasks
   */
  createTask(req, res) {
    try {
      // req.body contains the JSON sent by the client
      const payload = req.body;

      // Delegate to the service
      const createdTask = taskService.createTask(payload);

      // Return the created task with HTTP 201 Created
      return res.status(201).json({
        message: 'Task successfully created',
        task: createdTask
      });

    } catch (err) {
      /**
       * The service throws errors with a custom `.status` property for expected
       * validation or logic failures. All other unhandled errors are 500s.
       */
      const statusCode = err.status || 500;

      return res.status(statusCode).json({
        error: err.message || 'Internal server error'
      });
    }
  }
}

module.exports = new TaskController();
