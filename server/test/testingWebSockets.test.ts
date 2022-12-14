import http from 'http';
import WebSocket from 'ws';
import UptimeServer from '../src/webSocket';

let webServer: any;
let uptimeServer: any;

beforeAll((done) => {
  webServer = http.createServer();
  uptimeServer = new UptimeServer(webServer, '/api/v1');
  // Use separate port for testing
  webServer.listen(3001, () => done());
});
 
afterAll((done) => {
  if (!uptimeServer) return done(new Error());
  uptimeServer.close();

  if (!webServer) return done(new Error());
  webServer.close(() => done());
});


describe('testing WebSocket functionality', () => {
  test('Connection opens successfully', (done) => {
    const connection = new WebSocket('ws://localhost:3001/api/v1/uptime');
 
    connection.on('open', () => {
      connection.close();
      done();
    });
 
    connection.on('error', (error) => {
      done(error);
    });
  });
});