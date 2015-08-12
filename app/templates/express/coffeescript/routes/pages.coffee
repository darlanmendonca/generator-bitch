express = require 'express'
controller = require('../controllers').pages

router = express.Router()

router
  .route <% if ((appType === 'client' || appType === 'both') && appFramework === 'angular') { %>'*'<% } else {%>'/'<% } %>
  .get controller.home

router
  .use (req, res)->
    res.status(404).render '404',
      title: 'Not Found :('

module.exports = router
