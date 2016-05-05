/* globals angular */
'use strict';

angular
  .module('<%= slugify(appName) %>')
  .config(appConfig);

<% if (angularRoute === 'uiRouter') { %>function appConfig($locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}<% } %><% if (angularRoute === 'ngRoute') { %>function appConfig($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise('/404');
}<% } %>
