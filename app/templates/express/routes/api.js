'use strict';

let express = require('express');
let api = require('../controllers').api;
let jwt = require('jsonwebtoken');
let config = require('../config');

let router = express.Router();

router.param('id', function(req, res, next, value) {
  let reg = /^[0-9a-fA-F]{24}$/;
  if (!reg.test(value)) {
    return res.status(400).json({
      message: 'invalid id'
    });
  }
  next();
});

router
  .route('/auth')
  .post(api.auth.local);

router.use(function(req, res, next) {
  let token = req.body.token || req.query.token || req.headers.token;
  if (!token) {
    return res.status(403).json({
      message: 'no token provided'
    });
  }

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(403).json({
        message: 'invalid token'
      });
    }

    req.decoded = decoded;
    next();
  });
});

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
