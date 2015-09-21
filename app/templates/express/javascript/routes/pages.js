'use strict';

var express = require('express');
var pages = require('../controllers').pages;

var router = express.Router();

router
  .route(<% if ((appType === 'client' || appType === 'both') && appFramework === 'angular') { %>'*'<% } else {%>'/'<% } %>)
  .get(pages.home);

router
  .use(function (req, res) {
    res.status(404).render('404', {
      title: 'Not Found :('
    });
  });

module.exports = router;
