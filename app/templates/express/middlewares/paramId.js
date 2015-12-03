'use strict';

module.exports = function(req, res, next, value) {
  let reg = /^[0-9a-fA-F]{24}$/;
  let validId = reg.test(value);
  if (!validId) {
    return res.status(400).json({
      message: 'invalid id'
    });
  }
  next();
};
