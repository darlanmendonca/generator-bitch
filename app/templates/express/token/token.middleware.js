'use strict';

let jwt = require('jsonwebtoken');
let config = require('../../config');

module.exports = function(req, res, next) {
	let token = req.body.token || req.query.token || req.headers.token;
	if (!token) {
		return res.status(401).json({
			message: 'no token provided'
		});
	}

	jwt.verify(token, config.secret, function(err, decoded) {
		if (err) {
			return res.status(401).json({
				message: 'invalid token'
			});
		}

		req.decoded = decoded;
		next();
	});
};
