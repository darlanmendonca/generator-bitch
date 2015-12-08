'use strict';

let express = require('express');
let pages = require('../controllers.js').pages;

let router = express.Router();

router
  .route('*')
  .get(pages.home);

module.exports = router;
