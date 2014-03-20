var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!
var helpers = require('./http-helpers');



var getInfo = function(req, res){
  var getURL = url.parse(req.url).pathname;
  fs.readFile(path.join(__dirname, '../archives/sites.txt'), function (err, data) {
    if (err) {
      console.log(err);
    }
    var eachURL = data.toString().split('\n');
    for (var i=0; i<eachURL.length; i++) {
      if (getURL === '/' + eachURL[i]) {
        fs.readFile(path.join(__dirname, '../archives/sites' + getURL), function (err, data) {
          if (err) {
            console.log(err);
          }

          var asset = data.toString();
          helpers.serveAssets(res, asset, 200);
        });
      }
    }
  });

  // helpers.serveAssets(res, './public/index.html', 200);
};

var postInfo = function(req, res){
  helpers.serveAssets(res, asset, 200);
};

var options = function(req, res){
  helpers.serveAssets(res, asset, 200);
};

var actions = {
  'GET': getInfo,
  'POST': postInfo,
  'OPTIONS': options
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];

  if (action){
    action(req, res);
  } else {
    helpers.serveAssets(res, null, 404);
  }

  // res.end(archive.paths.list);
};
