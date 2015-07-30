'use strict';

var express = require('express');
var controller = require('../controllers').api;

var router = express.Router();


router
  .route('/')
  .get(controller.home);

router
  .use(function (req, res) {
    res.status(404).json({
      message: 'resource not found :('
    });
  });

module.exports = router;
