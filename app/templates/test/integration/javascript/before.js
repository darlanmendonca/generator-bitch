var mongoose = require('mongoose');
var config = require('../../config');

before(function(done){
  mongoose.connect(config.database.url, function() {
    done();
  });
});
