angular
  .module('<%= slugify(appname) %>')
  .config(routes);

<% if (angularRoute === 'uiRouter') { %>function routes($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'templates/about.html',
      controller: 'AboutController'
    });
}<% } %><% if (angularRoute === 'ngRoute') { %>function routes($locationProvider, $routeProvider) {
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
