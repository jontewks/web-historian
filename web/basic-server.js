var http = require("http");
var handler = require("./request-handler");
var helpers = require('./http-helpers');
var url = require('url');

var port = 8080;
var ip = "127.0.0.1";

// var routes = {
//   '/': handler.handleRequest,
//   '/arglebargle': function() {
//     console.log('YOMAN');
//   }
// };

// var router = function(req, res) {
//   console.log("Serving request type " + req.method + " for url " + req.url);

//   var parsedUrl = url.parse(req.url);
//   var route = routes[parsedUrl.pathname];
//   console.log(route);
//   if (route){
//     route(req, res);
//   } else {
//     helpers.serveAssets(res, null, 404);
//   }
// };

// var server = http.createServer(router);

var server = http.createServer(handler.handleRequest);
server.listen(port, ip);
