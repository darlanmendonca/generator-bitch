mongoose = require('mongoose');

Schema = mongoose.Schema;
userSchema = new Schema
  email: String
  username: String
  password: String
  createdAt: {type: Date, default: Date.now}


module.exports = mongoose.model 'users', userSchema
