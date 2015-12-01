'use strict';

let crypto = require('crypto');

let EncodeHelper = function (str) {
  str = str || '';
  let hash = crypto.createHash('md5').update(str).digest('hex');
  return hash;
};

module.exports = EncodeHelper;
