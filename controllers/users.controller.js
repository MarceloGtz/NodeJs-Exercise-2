// Models
const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    include: Task,
  });

  res.status(200).json({
    status: 'success',
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: 'success',
    newUser,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    user,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  // await user.destroy();
  await user.update({ status: 'disabled' });

  res.status(204).json({ status: 'success' });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
