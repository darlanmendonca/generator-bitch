'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('users', userSchema);
