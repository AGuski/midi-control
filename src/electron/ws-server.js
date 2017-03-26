const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let connections = {};
let connectionCounter = 0;

wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.id = connectionCounter++;
  connections[ws.id] = ws;

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    for (var id in connections) {
      connections[id].send(message);
    }
  });

  ws.on('close', function close() {
    delete connections[ws.id];
    console.log('connection: '+ws.id+' closed.');
  });

  ws.send('{ "system": "client '+ws.id+' connected to server"}');
  console.log('client '+ws.id+' connected to server');
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});