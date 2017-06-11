const express = require('express');
const http = require('http');
const url = require('url');

const app = express();

const server = http.createServer(app);
const port = 4200

app.use('/', express.static(__dirname+'/app'));

server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});