const WebSocket = require('ws');
const sanitizeHtml = require('sanitize-html');
//import * as sanitizeHtml from 'sanitize-html';

// starts server instance on http://localhost:8080
const wss = new WebSocket.Server({ port: 5001 });

// waits for connection to be established from the client
// the callback argument ws is a unique for each client
wss.on('connection', (ws) => {

  // runs a callback on message event
  ws.on('message', (data) => {
    data = sanitizeHtml(data);
    // sends the data to all connected clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
    });
  });
});
