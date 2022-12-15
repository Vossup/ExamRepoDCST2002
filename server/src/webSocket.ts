import type http from 'http';
import type https from 'https';
import WebSocket from 'ws';
 
export default class ClassAttendance {
 
  constructor(webServer: http.Server | https.Server, path: string) {
    const server = new WebSocket.Server({ server: webServer, path: path + '/classAttendance' });

    // Array to keep track of all connected clients
    let curretConnections: { connection : WebSocket, name : string }[] = [];

    // Based on the task description i implemented the 'join' action to be sent by the client
    // this means to join the lecture the client has to send a newStudent action before he is considered to have joined the lecture.
    server.on('connection', (connection: WebSocket) => {

      connection.on('message', (message: WebSocket.Data) => {
        // Parse the message containing {action: string, name: string} or {action: string}
        const data = JSON.parse(message.toString());
        if (data.action == 'getAll') {
          // Send the list of all connected clients to the new client in the form {students : []}
          connection.send(JSON.stringify( {students : (curretConnections.map(x => x.name) )} ));
        }
        else if (data.action == 'newStudent') {
          // Add the new student to the array of connected clients
          curretConnections.push({ connection: connection, name: data.name });
          // Send the new student to all existing clients in the form {newStudent : string}
          curretConnections.forEach(x => x.connection.send(JSON.stringify( {newStudent : data.name} )));
        }
      });

      connection.on('close', () => {
        // Remove the client from the array of connected clients
        curretConnections = curretConnections.filter(x => x.connection !== connection);
        // Send the list of all connected clients to all clients
      });

      connection.on('error', (error: Error) => {
        // Remove the client from the array of connected clients
        curretConnections = curretConnections.filter(x => x.connection !== connection);
      });
    });
  }
}
