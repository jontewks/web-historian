var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var https = require('https');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  //'/' : path.join(__dirname, './index.html')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  // return list of URLs
  fs.readFile(exports.paths.list, function(err, data){
    if (err) { console.log('ERROR!!!') }
    data = data.toString().split('\n');
    callback(data);
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(urlArray){
    for (var i = 0; i < urlArray.length; i++) {
      if (url === urlArray[i]) {
        callback(true);
      }
    }
    callback(false);
  });
};

exports.addUrlToList = function(url){
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    console.log(err);
  });
};

exports.isURLArchived = function(url, callback){
  if (url[0] === '/') { url = url.slice(1); }
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (err) { console.log(err); }
    _.each(files, function(file) {
      if (file === url) {
        callback(true);
      }
    });
    callback(false);
  });
};

exports.downloadUrls = function(){
  exports.readListOfUrls(function(urlArray) {
    _.each(urlArray, function(url) {
      exports.isURLArchived(url, function(result) {
        if (!result) {
          http.get('http://' + url, function(res) {
            var html = '';
            res.on('data', function(chunk) {
              html += chunk;
            });
            res.on('end', function() {
              fs.writeFile(exports.paths.archivedSites + '/' + url, html);
            });
          }).on('error', function(e) {
            https.get('https://' + url, function(res) {
              var html = '';
              res.on('data', function(chunk) {
                html += chunk;
              });
              res.on('end', function() {
                fs.writeFile(exports.paths.archivedSites + '/' + url, html);
              });
            }).on('error', function(e) {
              console.log('Something is very wrong');
            });
          });
        }
      });
    });
  });
};
