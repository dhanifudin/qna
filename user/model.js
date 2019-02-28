'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password'))
    return next();

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

UserSchema.plugin(mongooseHidden, { hidden: { _id: false, password: true, __v: true }});

module.exports = mongoose.model('User', UserSchema);