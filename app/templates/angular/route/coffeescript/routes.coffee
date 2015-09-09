angular
  .module '<%= slugify(appname) %>'
  .config <% if (angularRoute === 'uiRouter') { %>($locationProvider, $urlRouterProvider, $stateProvider)->
    $locationProvider.html5Mode true
    $urlRouterProvider.otherwise '/404'

    $stateProvider
      .state 'home',
        url: '/'
        templateUrl: 'templates/home.html'
        controller: 'HomeController'
      .state 'about',
        url: '/about'
        templateUrl: 'templates/about.html'
        controller: 'AboutController'<% } %><% if (angularRoute === 'ngRoute') { %>($locationProvider, $routeProvider)->
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise('/404');

    $routeProvider
      .when '/',
        templateUrl: 'templates/home.html'
        controller: 'HomeController'
      .when '/about',
        templateUrl: 'templates/about.html'
        controller: 'AboutController'<% } %>
