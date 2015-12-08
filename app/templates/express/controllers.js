'use strict';

var api = {
	auth: require('./auth/auth.controller.js'),
	users: require('./users/users.controller.js')
};
<% if (appType === 'both') { %>
var pages = require('./pages/pages.controller.js');<% } %>

module.exports = {
	api,<% if (appType === 'both') { %>
	pages<% } %>
};
