'use strict';

var AuthController = {};
var Users = require('../../models').users;
var config = require('../../config');
var jwt = require('jsonwebtoken');
var encode = require('../../helpers/encode.js');
var publicFields = '-__v -password';

AuthController.local = function(req, res) {
  var password = encode(req.body.password);
  Users
    .findOne({email: req.body.email, password: password}, publicFields)
    .then(function(user) {
      if (!user) {
        return res.status(400).json({
          message: 'authentication failed'
        });
      }

      res.json({
        id: user._id,
        token: jwt.sign(user, config.secret, config.token)
      });
    });
};

module.exports = AuthController;
