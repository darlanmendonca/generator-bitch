'use strict';

let UsersController = {};
let Users = require('../../models').users;
let ObjectId = require('mongoose').Types.ObjectId;
let publicFields = '-__v -password';

UsersController.list = function(req, res) {
	/**
    * @api {GET} /users/ list
    * @apiDescription Get list of users
    * @apiName list
    * @apiGroup Users
    * @apiPermission Authenticated
    */
  Users
    .find({}, publicFields)
    .then(function(users) {
      res.json(users);
    });
};

UsersController.get = function(req, res) {
	/**
    * @api {GET} /users/:id get
    * @apiDescription Get data of a user
    * @apiName get
    * @apiGroup Users
    * @apiPermission Authenticated
    */
  Users
    .findOne({_id: new ObjectId(req.params.id)}, publicFields)
    .then(function(user) {
      res.json(user);
    });
};

UsersController.create = function(req, res) {
	/**
    * @api {POST} /users create
    * @apiDescription Create a new user
    * @apiName create
    * @apiGroup Users
    * @apiPermission Authenticated
    *
    * @apiParam {String} email email of user
    * @apiParam {String} password password of user
    */
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
