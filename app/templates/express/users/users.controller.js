'use strict';

let UsersController = {};
let Users = require('./users.model.js');
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
		let status = user ? 200 : 204;
	  res
	  	.status(status)
	  	.json(user);
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
	})
	.catch(function(err) {
	  res.status(400).json(err.errors);
	});
};

UsersController.update = function(req, res) {
	/**
	* @api {PUT} /users/:id update
	* @apiDescription Update a user
	* @apiName update
	* @apiGroup Users
	* @apiPermission Authenticated
	*/
  Users
	.findOne({_id: new ObjectId(req.params.id)})
	.then(function(user) {
		for (var key in req.body) {
			user[key] = req.body[key];
		}

		user
			.save()
			.then(function() {
			  res.status(204).json();
			});
	});
};

UsersController.delete = function(req, res) {
	/**
	* @api {DELETE} /users/:id delete
	* @apiDescription Delete a user
	* @apiName delete
	* @apiGroup Users
	* @apiPermission Authenticated
	*/
  Users
	.findByIdAndRemove(req.params.id)
	.then(function() {
	  res.status(204).json();
	});
};

module.exports = UsersController;
