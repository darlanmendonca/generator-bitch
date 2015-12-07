'use strict';

let AuthController = {};
let Users = require('../users/users.model.js');
let config = require('../../config');
let jwt = require('jsonwebtoken');
let encode = require('../encode/encode.helper.js');
let publicFields = '-__v -password';

AuthController.local = function(req, res) {
	/**
		* @api {POST} /auth local
		* @apiDescription Authentication user with local strategy
		* @apiName local
		* @apiGroup Auth
		* @apiPermission Public
		*
		* @apiParam {String} email email of user
		* @apiParam {String} password password of user
		*/
	let password = encode(req.body.password);
	Users
		.findOne({email: req.body.email, password: password}, publicFields)
		.then(function(user) {
			if (!user) {
				return res.status(401).json({
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
