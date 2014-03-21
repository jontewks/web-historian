var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!
var helpers = require('./http-helpers');

var routes = {
  '/': '/index.html',
  '/styles.css': '/styles.css',
  '/favicon.ico': '/favicon.ico'
};

archive.isURLArchived('www.google.com', function(result) {
  console.log('google is archived: ', result);
});

var getInfo = function(req, res){

  var getURL = url.parse(req.url).pathname;
  if (routes[getURL]) {
    fs.readFile(archive.paths.siteAssets + routes[getURL], function (err, data) {
      if (err) {
        helpers.serveAssets(res, '404: Sauri Gurl', 404);
      } else {
        helpers.serveAssets(res, data, 200);
      }
    });
  } else {
    fs.readFile(archive.paths.list, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var eachURL = data.toString().split('\n');
        for (var i=0; i<eachURL.length; i++) {
          if (getURL === '/' + eachURL[i]) {
            fs.readFile(path.join(__dirname, '../archives/sites' + getURL), function (err, data) {
              if (err) {
                helpers.serveAssets(res, '404: Sauri Gurl', 404);
              }
              helpers.serveAssets(res, data, 200);
            });
          }
        }
      }
    });
  }
};

var postInfo = function(req, res){
  var daytah = '';
  req.on('data', function(chunk){
    daytah += chunk;
  });
  req.on('end', function(){
    //console.log('WTF:', data.slice(4));
    daytah = daytah.slice(4);
    fs.readFile(archive.paths.list, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var eachURL = data.toString().split('\n');
        for (var i=0; i<eachURL.length; i++) {
          if (daytah === eachURL[i]) {
            fs.readFile(path.join(__dirname, '../archives/sites' + '/' + daytah), function (err, data) {
              if (err) {
                console.log(err);
              }
              helpers.serveAssets(res, data, 200);
            });
          }
        }
      }
    });
  });


  //helpers.serveAssets(res, asset, 200);
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
};
