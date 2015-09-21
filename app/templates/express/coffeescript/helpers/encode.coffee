crypto = require('crypto');

EncodeHelper = (str)->
  str = if str then str else ''
  hash = crypto.createHash('md5').update(str).digest('hex')

module.exports = EncodeHelper
