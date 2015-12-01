'use strict';

module.exports = {
	api: require('./api')<% if (appType === 'client' || appType === 'both') { %>,
	pages: require('./pages')<% } %>
};
