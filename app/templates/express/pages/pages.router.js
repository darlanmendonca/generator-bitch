'use strict';

let express = require('express');
let pages = require('../controllers/controllers.js').pages;

let router = express.Router();

router
  .route('/')
  .get(pages.home);

router
  .use(function (req, res) {
    res.status(404).render('404', {
      title: 'Not Found :('
    });
  });

module.exports = router;
