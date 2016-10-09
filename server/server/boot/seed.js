'use strict';

const path = require('path');

module.exports = function(server, cb) {
  server.seed(path.join(__dirname, '..', 'db', 'seeds'), cb);
};
