'use strict';
var crypto = require('crypto');

var EncodeHelper = function (str) {
  var str = str ? str : '';
  var hash = crypto.createHash('md5').update(str).digest('hex');
  return hash;
};

module.exports = EncodeHelper;
