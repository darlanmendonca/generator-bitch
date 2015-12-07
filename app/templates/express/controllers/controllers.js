'use strict';

var api = {
	auth: require('../auth/auth.controller.js'),
	users: require('../users/users.controller.js')
};

var pages = require('../pages/pages.controller.js');

module.exports = {
	api,
	pages
};
