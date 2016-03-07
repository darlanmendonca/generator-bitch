'use strict';

require('./tasks/lint.js');<% if (appType === 'server') { %>
require('./tasks/docs.js');
require('./tasks/server.js');<% } %><% if (appType === 'client') { %>
require('./tasks/livereload.js');
require('./tasks/sprite-images.js');
require('./tasks/styles.js');
require('./tasks/scripts.js');
require('./tasks/views.js');
require('./tasks/dependencies.js');<% } %>
require('./tasks/watch.js');
require('./tasks/default.js');
