var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!
var helpers = require('./http-helpers');

var routes = {
  '/': '/index.html',
  '/styles.css': '/styles.css',
  '/favicon.ico': '/favicon.ico',
  '/loading.html': '/loading.html'
};

var getInfo = function(req, res){
  var reqUrl = url.parse(req.url).pathname;
  console.log('requrl', reqUrl);
  if (routes[reqUrl]) {
    helpers.serveAssets(res, archive.paths.siteAssets + routes[reqUrl], 200);
  } else {
    archive.isURLArchived(reqUrl, function(result){
      if (result) {
        helpers.serveAssets(res, archive.paths.archivedSites + reqUrl, 200);
      } else {
        archive.isUrlInList(reqUrl, function(result){
          if (result) {
            helpers.redirectToLoading(res);
          } else {
            helpers.send404(res);
          }
        });
      }
    });
  }
};

var postInfo = function(req, res){
  var data = '';
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end', function(){
    var reqUrl = data.split('=')[1];
    archive.isURLArchived(reqUrl, function(result){
      if (result) {
        helpers.serveAssets(res, archive.paths.archivedSites + '/' + reqUrl, 200);
      } else {
        archive.isUrlInList(reqUrl, function(result){
          if (result) {
            helpers.redirectToLoading(res);
          } else {
            archive.addUrlToList(reqUrl);
            helpers.redirectToLoading(res);
          }
        });
      }
    });
  });
};

var options = function(req, res){
  helpers.serveAssets(res, null, 200);
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
    helpers.send404(res);
  }
};
