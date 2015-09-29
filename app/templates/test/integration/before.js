'use strict';

let mongoose = require('mongoose');
let config = require('../../config');

before(function(done){
  mongoose.connect(config.database.url, () => done());
});
