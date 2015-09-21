'use strict';

var mongoose = require('mongoose');
var encode = require('../helpers/encode.js');

var schema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true, set: encode},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('users', schema);
