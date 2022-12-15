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
    // Create two connections to the server and wait until they are both open
    const connection1 = new WebSocket('ws://localhost:3001/api/v1/classAttendance');
    const connection2 = new WebSocket('ws://localhost:3001/api/v1/classAttendance');

    await waitForSocketState(connection1, WebSocket.OPEN);
    await waitForSocketState(connection2, WebSocket.OPEN);

    // Add a student through connection 1 and get all students through connection 2
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

    // Wait for both connections to close and then check if the results are as expected
    await waitForSocketState(connection1, WebSocket.CLOSED);
    await waitForSocketState(connection2, WebSocket.CLOSED);
    expect(responseData).toEqual(expectedResponse1);
    expect(studentsConnectedForConnection2).toEqual(expectedStudentsConnectedForConnection2);
  });

  // Test of the removeStudent section after closing the connection
  test('Checking that removing student after closing connection works', async() => {
    const connection1 = new WebSocket('ws://localhost:3001/api/v1/classAttendance');
    const connection2 = new WebSocket('ws://localhost:3001/api/v1/classAttendance');
    const connection3 = new WebSocket('ws://localhost:3001/api/v1/classAttendance');

    await waitForSocketState(connection1, WebSocket.OPEN);
    await waitForSocketState(connection2, WebSocket.OPEN);
    await waitForSocketState(connection3, WebSocket.OPEN);

    // Add a student through connection 1
    // we expect to see the student added and thus expectedResponse1 should equal responseData1
    let messageDataConnection1 : any = {action : 'newStudent', name : 'John'};
    let expectedResponse1 : any = {newStudent : 'John'};
    let responseData1 : any;

    // Get all students through connection 2 we expect to see the student added through connection 1
    let messageDataConnection2 : any = {action : 'getAll'};
    let expectedResponseBeforeClosing2 : any = {students : ['John']};
    let responseDataBeforeClosing2 : any;

    connection1.send(JSON.stringify(messageDataConnection1));

    connection1.on('message', (message: WebSocket.Data) => {
      responseData1 = JSON.parse(message.toString());
    });

    connection2.send(JSON.stringify(messageDataConnection2));

    connection2.on('message', (message: WebSocket.Data) => {
      responseDataBeforeClosing2 = JSON.parse(message.toString());
    });

    // we close connection 1 and expect to see the student removed from the list of students
    connection1.close();
    connection2.close();

    await waitForSocketState(connection1, WebSocket.CLOSED);
    await waitForSocketState(connection2, WebSocket.CLOSED);

    // We use connection 3 to get all students and expect to see an empty list of students
    let expectedResponseAfterClosing3 : any = {students : []};
    let responseDataAfterClosing3 : any;
    let messageDataConnection3 : any = {action : 'getAll'};

    connection3.send(JSON.stringify(messageDataConnection3));

    connection3.on('message', (message: WebSocket.Data) => {
      responseDataAfterClosing3 = JSON.parse(message.toString());
      connection3.close();
    });

    // finally we close connection 3 and can inspect results.
    await waitForSocketState(connection3, WebSocket.CLOSED);

    expect(responseData1).toEqual(expectedResponse1);
    expect(responseDataBeforeClosing2).toEqual(expectedResponseBeforeClosing2);
    expect(responseDataAfterClosing3).toEqual(expectedResponseAfterClosing3);
  });
  // We should maybe add a test for the error section of the websocket, but unsure how to test for such a case
  // as it has not been covered much in the curriculum
  // With the above tests we have 88% coverage of the websocket and 75% of branches.
});