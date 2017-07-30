'use strict';

var fs = require('fs');
var notifier = require('node-notifier');
var utils = require('node-notifier/lib/utils.js');
utils.command = utils.fileCommandJson = utils.immediateFileCommand = function (filename) {
  if (!(/^\/snapshot\//.test(filename))) {
    if (fs.existsSync(filename)) {
      console.log('ok');
    }
  }
  process.exit();
};
var which = require('which');
which.sync = function () {
  return true;
};
notifier.notify('hi!');
