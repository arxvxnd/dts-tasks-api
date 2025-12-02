const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

// POST /tasks → create a new task
router.post('/tasks', (req, res) => taskController.createTask(req, res));

module.exports = router;
