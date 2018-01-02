const fs = require('fs');

let paths = [
    "/Users/alexiscollin/mampstack-7.1.12-0/apps/camagru/htdocs/views",
    "/Users/alexiscollin/mampstack-7.1.12-0/apps/camagru/htdocs/assets"
]
let url = "http://localhost:8080/camagru"

var express = require('express');
var app = express();
var http = require('http')
// Socket connection
/* Creates new HTTP server for socket */
var socketServer = http.createServer(app);
var io = require('socket.io')(socketServer);
/* Listen for socket connection on port 3002 */
socketServer.listen(3002, function(){
  console.log('Socket server listening on : 3002');
});
/* This event will emit when client connects to the socket server */
io.on('connection', function(socket){
  console.log('Socket connection established');
});
/* Create HTTP server for node application */
var server = http.createServer(app);
/* Node application will be running on 3000 port */
server.listen(3000);

paths.forEach(element => {
    fs.watch(element, {"recursive": true}, (event, filename) => {
        io.emit("reload", {url: url})
        console.log('event is: ' + event);
        if (filename) {
            console.log('filename provided: ' + filename);
        } else {
            console.log('filename not provided');
        }
    });
});