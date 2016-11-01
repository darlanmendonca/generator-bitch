import gulp from 'gulp';

gulp.task('default', [
  'views',<% if (appFramework === 'angular') {%>
  'templates',<% } %>
  'browser-sync',
  'sprites',
  'styles',
  'scripts',
  'lint',
  'watch',
]);
