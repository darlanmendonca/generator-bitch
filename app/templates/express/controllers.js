'use strict';

var api = {
	auth: require('./auth/auth.controller.js'),
	users: require('./users/users.controller.js')
};

module.exports = {api};
