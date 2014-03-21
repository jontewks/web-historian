var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

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
      } else {
        callback(false);
      }
    }
  });
};

exports.addUrlToList = function(url){
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    console.log(err);
  });
};

exports.isURLArchived = function(url, callback){
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

exports.downloadUrls = function(url){
  http.get(url, function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
};
