'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  surname: String,
  avatar: String,
  password: { type: String, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.method('comparePassword', function(plainPassword, next) {
  bcrypt.compare(plainPassword, this.password, function(err, result) {
      if (err) return next(err);

      next(null, result);
  });
});

module.exports = mongoose.model('User', UserSchema);