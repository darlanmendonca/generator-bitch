mongoose = require('mongoose');

encode = (str)->
  crypto = require('crypto');
  hash = crypto.createHash('md5').update(str).digest('hex')

schema = new mongoose.Schema
  email: {type: String, required: true}
  password: {type: String, required: true, set: encode}
  createdAt: {type: Date, default: Date.now}

module.exports = mongoose.model 'users', schema
