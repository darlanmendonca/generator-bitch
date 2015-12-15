'use strict';

module.exports = {
	api: require('./api/api.router.js'),<% if (appType === 'both') { %>
	pages: require('./pages/pages.router.js')<% } %>
};
