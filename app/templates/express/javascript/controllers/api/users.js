'use strict';
var UsersController = {};
var Users = require('../../models').users;
var ObjectId = require('mongoose').Types.ObjectId;
var publicFields = '-__v -password';

UsersController.list = function(req, res) {
  Users
    .find({}, publicFields)
    .then(function(users) {
      res.json(users);
    });
};

UsersController.get = function(req, res) {
  Users
    .findOne({_id: new ObjectId(req.params.id)}, publicFields)
    .then(function(user) {
      res.json(user);
    });
};

UsersController.create = function(req, res) {
  var User = new Users(req.body);
  User
    .save()
    .then(function(user) {
      res.status(201).json({
        id: user._id
      });
    }, function(err) {
      res.status(400).json(err.errors);
    });
};

module.exports = UsersController;
