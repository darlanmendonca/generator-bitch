angular
  .module '<%= slugify(appname) %>', [<% if (ngAnimate) { %>
    'ngAnimate'<% } %><% if (ngCookies) { %>
    'ngCookies'<% } %><% if (ngResource) { %>
    'ngResource'<% } %><% if (ngSanitize) { %>
    'ngSanitize'<% } %><% if (ngTouch) { %>
    'ngTouch'<% } %>
    'ui.router'
  ]
  .config ($stateProvider, $urlRouterProvider, $locationProvider)->
    $locationProvider.html5Mode true
    $urlRouterProvider.otherwise '/404'

    $stateProvider
      .state 'home',
        url: '/'
        templateUrl: 'partials/home.html'

      .state 'about',
        url: '/about'
        templateUrl: 'partials/about.html'

