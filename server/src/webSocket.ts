import type http from 'http';
import type https from 'https';
import WebSocket from 'ws';
 
export default class UptimeServer {
 
  constructor(webServer: http.Server | https.Server, path: string) {
    const server = new WebSocket.Server({ server: webServer, path: path + '/uptime' });

    server.on('connection', (connection: WebSocket) => {
      connection.on('message', (message: WebSocket.Data) => {
      });
      connection.on('close', () => {
      });
      connection.on('error', (error: Error) => {
      });
    });
  }
}
