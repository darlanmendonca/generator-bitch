/* globals angular */
'use strict';

angular
  .module('<%= slugify(appname) %>')
  .config(routeConfig);

<% if (angularRoute === 'uiRouter') { %>function routeConfig($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'templates/about.html',
      controller: 'AboutController',
      controllerAs: 'about'
    });
}<% } %><% if (angularRoute === 'ngRoute') { %>function routeConfig($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise('/404');

  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
    })
    .when('/about', {
      templateUrl: 'templates/about.html',
      controller: 'AboutController'
    });
}<% } %>
