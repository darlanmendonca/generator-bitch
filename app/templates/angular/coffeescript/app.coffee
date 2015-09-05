angular
  .module '<%= slugify(appname) %>', [<% if (ngAnimate) { %>
    'ngAnimate'<% } %><% if (ngCookies) { %>
    'ngCookies'<% } %><% if (ngResource) { %>
    'ngResource'<% } %><% if (ngSanitize) { %>
    'ngSanitize'<% } %><% if (ngTouch) { %>
    'ngTouch'<% } %><% if (angularRoute === 'uiRouter') { %>
    'ui.router'<% } %><% if (angularRoute === 'ngRoute') { %>
    'ngRoute'<% } %>
  ]

