'use strict';

let angular = require('angular');

angular.module('<%= slugify(appName) %>', [<% if (ngAnimate) { %>
  require('angular-animate'),<% } %><% if (ngCookies) { %>
  require('angular-cookies'),<% } %><% if (ngResource) { %>
  require('angular-resource'),<% } %><% if (ngSanitize) { %>
  require('angular-sanitize'),<% } %><% if (ngTouch) { %>
  require('angular-touch'),<% } %><% if (angularRoute === 'uiRouter') { %>
  require('angular-ui-router'),<% } %><% if (angularRoute === 'ngRoute') { %>
  require('angular-route'),<% } %>
]);
