const express = require('express');

// Controllers
const {
  getAllTasks,
  createTask,
  getTaskByStatus,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

// Middlewares
const {
  createTaskValidators,
} = require('../middlewares/validators.middleware');
const { taskExists } = require('../middlewares/tasks.middleware');

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.post('/', createTaskValidators, createTask);

tasksRouter.get('/:status', taskExists, getTaskByStatus);

tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };
