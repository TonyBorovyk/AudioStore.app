const WebSocketServer = require('ws');

const rooms = new Map();

const webSocketServer = new WebSocketServer.Server({
  port: 8081,
});

const addRoom = (roomName, id, roomId, connection) => {
  if (typeof rooms[roomName] === 'undefined') {
    rooms.set(roomName, {
      roomId,
      adminId: id,
      adminConnection: connection,
      usersIds: [id],
      usersConnections: [connection],
    });
  } else {
    rooms.get(roomName).usersIds.push(id);
    rooms.get(roomName).usersConnections.push(connection);
  }
};

const sendToEveryoneInARoom = (socket, message) => {
  const foundObj = rooms.find((room) => room.adminConnection === socket);
  if (typeof foundObj !== 'undefined') {
    foundObj.usersConnections.forEach((connection) => connection.send(message));
  } else {
    socket.send('You have to be admin');
  }
};

webSocketServer.on('connection', (socket) => {
  console.log(socket);
  socket.on('message', (message) => {
    console.log(message);
    const messageObj = JSON.parse(message);
    if (messageObj.method === 'connect') {
      addRoom(messageObj.field2, messageObj.field1, messageObj.field3, socket);
    } else if (
      messageObj.method === 'play' ||
      messageObj.method === 'pause' ||
      messageObj.method === 'stop'
    ) {
      sendToEveryoneInARoom(socket, messageObj.method);
    } else if (messageObj.method === 'new track') {
      sendToEveryoneInARoom(socket, messageObj.field1);
    }
  });

  socket.on('close', () => {
    const foundObj = rooms.find((room) => room.adminConnection === socket);
    if (typeof foundObj !== 'undefined') {
      const roomName = rooms.findIndex(
        (room) => room.adminConnection === socket
      );
      rooms
        .get(roomName)
        .usersConnections.forEach((connection) =>
          connection.send('Connection is closed')
        );
      delete rooms.get(roomName);
    } else {
      const foundCon = rooms.find((room) =>
        room.usersConnections.contains(socket)
      );
      const ind = foundCon.usersConnections.findIndex(socket);
      foundObj.usersConnections.splice(ind);
      foundObj.usersIds.splice(ind);
      socket.send('Connection is closed');
    }
  });
});
