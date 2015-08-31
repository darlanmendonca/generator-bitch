'use strict';

angular
  .module('<%= slugify(appname) %>')
  .config(config);

function config ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'partials/about.html'
    });
}
