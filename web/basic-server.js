var http = require("http");
var handler = require("./request-handler");

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(handler.handleRequest);
server.listen(port, ip);
