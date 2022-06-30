// Models
const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll({
    include: User,
  });

  res.status(200).json({
    status: 'success',
    tasks,
  });
});

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;

  const newTask = await Task.create({
    title,
    userId,
    limitDate,
  });

  res.status(201).json({
    status: 'success',
    newTask,
  });
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  const tasksByStatus = await Task.findAll({ where: { status } });

  res.status(200).json({
    status: 'success',
    tasksByStatus,
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const { task } = req;
  const { finishTime } = req.body;

  await task.update({ finishTime });

  res.status(204).json({ status: 'success' });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const { task } = req;

  // await user.destroy();
  await task.update({ status: 'cancelled' });

  res.status(204).json({ status: 'success' });
});

module.exports = {
  getAllTasks,
  createTask,
  getTaskByStatus,
  updateTask,
  deleteTask,
};
