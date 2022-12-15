import http from 'http';
import WebSocket from 'ws';
import ClassAttendance from '../src/webSocket';

// This function is used to start the server and return a promise that resolves when the server is ready
function startServer(port : number) {
  const webServer = http.createServer();
  new ClassAttendance(webServer, '/api/v1');
  return new Promise((resolve, ) => {
    webServer.listen(port, () => resolve(webServer));
  });
}

// This function is used to wait for the socket to be in a specific state
// This allows more fine grained control of testing environment with ws and jest
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

// This is done to start the server before all tests and close it after all tests
let server : any;
beforeAll(async () => {
  server = await startServer(3001);
});
afterAll(() => {
  server.close();
});

// This is the actual test suite
describe('testing WebSocket', () => {
  // Simple test of the connection
  test('Connection opens successfully', async() => {
    const connection = new WebSocket('ws://localhost:3001/api/v1/classAttendance');
    await waitForSocketState(connection, WebSocket.OPEN);
    connection.close();
    await waitForSocketState(connection, WebSocket.CLOSED);
  });

  // Test of the getAll action
  test('Getting all connected students (message {action : getAll})', async() => {
    const connection = new WebSocket('ws://localhost:3001/api/v1/classAttendance');
    await waitForSocketState(connection, WebSocket.OPEN);
    let messageData : Object = {action : 'getAll'};
    let responseData : any;
    let expectedResponse : any = {students : []};

    connection.send(JSON.stringify(messageData));

    connection.on('message', (message: WebSocket.Data) => {
      responseData = JSON.parse(message.toString());
      connection.close();
    });

    await waitForSocketState(connection, WebSocket.CLOSED);
    expect(responseData).toEqual(expectedResponse);
  });

  // Test of the newStudent action
  test('Taking new student attendance(message {action : newStudent})', async() => {
    const connection = new WebSocket('ws://localhost:3001/api/v1/classAttendance');
    await waitForSocketState(connection, WebSocket.OPEN);
    let messageData : any = {action : 'newStudent', name : 'John'};
    let responseData : any;
    let expectedResponse : any = {newStudent : 'John'};

    connection.send(JSON.stringify(messageData));

    connection.on('message', (message: WebSocket.Data) => {
      responseData = JSON.parse(message.toString());
      connection.close();
    });

    await waitForSocketState(connection, WebSocket.CLOSED);
    expect(responseData).toEqual(expectedResponse);
  });

  // Test of the newStudent action and getAll action in combination to make sure results are as expected
  test('Getting all connected students after taking new student attendance', async() => {

    const connection1 = new WebSocket('ws://localhost:3001/api/v1/classAttendance');
    const connection2 = new WebSocket('ws://localhost:3001/api/v1/classAttendance');

    await waitForSocketState(connection1, WebSocket.OPEN);
    let messageDataConnection1 : any = {action : 'newStudent', name : 'John'};
    let responseData : any;
    let expectedResponse1 : any = {newStudent : 'John'};

    let studentsConnectedForConnection2 : any;
    let expectedStudentsConnectedForConnection2 : any = {students : ['John']};

    connection1.send(JSON.stringify(messageDataConnection1));

    connection1.on('message', (message: WebSocket.Data) => {
      responseData = JSON.parse(message.toString());
      connection1.close();
    });

    connection2.send(JSON.stringify({action : 'getAll'}));

    connection2.on('message', (message: WebSocket.Data) => {
      studentsConnectedForConnection2 = JSON.parse(message.toString());
      connection2.close();
    });

    await waitForSocketState(connection1, WebSocket.CLOSED);
    await waitForSocketState(connection2, WebSocket.CLOSED);
    expect(responseData).toEqual(expectedResponse1);
    expect(studentsConnectedForConnection2).toEqual(expectedStudentsConnectedForConnection2);
  });
});