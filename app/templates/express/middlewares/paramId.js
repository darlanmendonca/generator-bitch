'use strict';

module.exports = function(req, res, next, value) {
  let reg = /^[0-9a-fA-F]{24}$/;
  if (!reg.test(value)) {
    return res.status(400).json({
      message: 'invalid id'
    });
  }
  next();
};
