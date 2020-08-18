const asyncHandler = require('../../middleware/async');
const crypto = require('crypto');
const User = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');
const { sendTokenResponse } = require('../../utils/sendTokenResponse');

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public

exports.login = asyncHandler(async (req, res, next) => {
  const { lastname, password } = req.body;

  // Validate lastname and Password
  if (!lastname || !password) {
    return next(
      new ErrorResponse('Please provide and email and password', 400)
    );
  }

  // Check for User
  const user = await User.findOne({ lastname }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if Password Matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  sendTokenResponse(user, 200, res);
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/user
// @access    Private
exports.getLoggedInUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @Desc         Logout User
// @route        GET /auth/logout
// @access       Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});
