var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, url, statusCode) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  fs.readFile(url, function(err, data){
    if (err) { console.log(err); }
    res.end(data);
  });
};

exports.send404 = function(res) {
  res.writeHead(404, headers);
  res.end();
};

exports.redirectToLoading = function(res) {
  res.writeHead(302, {location: '/loading.html'});
  res.end();
};

// As you progress, keep thinking about what helper functions you can put here!
