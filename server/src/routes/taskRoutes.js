const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

// GET /tasks 
router.get('/', TaskController.getAllTasks);

// GET /tasks/:id 
router.get('/:id', TaskController.getTaskById);

// POST /tasks
router.post('/', TaskController.createTask);

// PUT /tasks/:id 
router.patch('/:id', TaskController.markAtComplete);

// DELETE /tasks/:id 
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
