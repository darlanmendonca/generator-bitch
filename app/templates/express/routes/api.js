'use strict';

let express = require('express');
let api = require('../controllers').api;
let middlewares = require('../middlewares');

let router = express.Router();

router.param('id', middlewares.paramId);

router
  .route('/auth')
  .post(api.auth.local);

router.use(middlewares.token);

router
  .route('/users')
  .get(api.users.list)
  .post(api.users.create);

router
  .route('/users/:id')
  .get(api.users.get);

router
  .use(function (req, res) {
    res.status(404).json({
      message: 'resource not found :('
    });
  });

module.exports = router;
