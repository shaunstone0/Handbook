const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter your first name'],
  },

  lastname: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
    minlength: 6,
    select: false,
  },
  notfications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notfication',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt Password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match password to hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash passwordtoken
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set Expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
