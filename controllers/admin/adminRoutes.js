const asyncHandler = require('../../middleware/async');
const User = require('../../models/User');
const Faq = require('../../models/Faq');

// @desc      Create user
// @route     POST /api/v1/admin/user/create
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc      Get all Users
// @route     GET /api/v1/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Delete User
// @route     DELETE /api/v1/user/:id
// @access    Private/Admin

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Delete fAQ
// @route     DELETE /api/v1/faq/:id
// @access    Private/Admin
exports.deleteFaq = asyncHandler(async (req, res, next) => {
  await Faq.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
