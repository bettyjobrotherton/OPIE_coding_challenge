'use strict';

const express = require('express');

const server = express();
const port = process.env.PORT || 8080;

server.use(express.static(__dirname + "/client"));

server.get('/', function(req, res){
  res.sendFile('client/index.html', {root: __dirname});
});

server.listen(port, function(){
  console.log("Now listening to port: " + port);
});
