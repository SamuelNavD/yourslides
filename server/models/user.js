'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  name: String,
  surname: String,
  avatar: String,
  password: { type: String, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
});

UserSchema.pre('save', (err) => {
  let user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return console.log(err);
    console.log('Usuario pass:' + user.password);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return console.log(err);
      user.password = hash;
    });
  });

  
});

module.exports = mongoose.model('User', UserSchema);