var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!
var helpers = require('./http-helpers');



var getInfo = function(req, res){
  var getURL = url.parse(req.url).pathname;
  fs.readFile(archive.paths.siteAssets + '/index.html', function (err, data) {
    if (err) {
      console.log(err);
    }else{
      helpers.serveAssets(res, data, 200);
    }
    // var eachURL = data.toString().split('\n');
    // for (var i=0; i<eachURL.length; i++) {
    //   if (getURL === '/' + eachURL[i]) {
    //     fs.readFile(path.join(__dirname, '../archives/sites' + getURL), function (err, data) {
    //       if (err) {
    //         console.log(err);
    //       }
    //       // console.log('data' + data);
    //       var asset = data.toString();
    //       console.log(asset + 'WTF');
    //       helpers.serveAssets(res, asset, 200);
    //     });
    //   }
    // }

  });
};

var postInfo = function(req, res){
  console.log("req.url =", req.url);
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
  console.log("incoming request type:", req.method);
  if (action){
    action(req, res);
  } else {
    console.log('WHY')
    helpers.serveAssets(res, null, 404);
  }

  // res.end(archive.paths.list);
};
