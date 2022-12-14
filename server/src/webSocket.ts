import type http from 'http';
import type https from 'https';
import WebSocket from 'ws';
 
export default class UptimeServer {
 
  constructor(webServer: http.Server | https.Server, path: string) {
    const server = new WebSocket.Server({ server: webServer, path: path + '/uptime' });

    server.on('connection', (socket: WebSocket) => {
      socket.on('message', (message: WebSocket.Data) => {
        console.log('Received message: ' + message);
      });
      socket.on('close', () => {
        console.log('Connection closed');
      });
    });
  }
}
