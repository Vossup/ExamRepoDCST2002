import http from 'http';
import WebSocket from 'ws';
import UptimeServer from '../src/webSocket';

function startServer(port : number) {
  const webServer = http.createServer();
  new UptimeServer(webServer, '/api/v1');
  return new Promise((resolve, ) => {
    webServer.listen(port, () => resolve(webServer));
  });
}

function waitForSocketState(socket : WebSocket, state : any) {
  return new Promise<void>(function (resolve) {
    setTimeout(function () {
      if (socket.readyState === state) {
        resolve();
      } else {
        waitForSocketState(socket, state).then(resolve);
      }
    }, 5);
  });
}

describe('testing WebSocket', () => {
  let server : any;
  beforeAll(async () => {
    server = await startServer(3001);
  });
  afterAll(() => {
    server.close();
  });

  test('Connection opens successfully', (done) => {
    const connection = new WebSocket('ws://localhost:3001/api/v1/uptime');
 
    connection.on('open', () => {
      connection.close();
      done();
    });
  });
});