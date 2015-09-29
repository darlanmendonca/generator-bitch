'use strict';

let UsersController = {};
let Users = require('../../models').users;
let ObjectId = require('mongoose').Types.ObjectId;
let publicFields = '-__v -password';

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
  let User = new Users(req.body);
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
