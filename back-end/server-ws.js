const WebSocketServer = require('ws');

const rooms = [];

const webSocketServer = new WebSocketServer.Server({
  port: 8081,
});

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const addRoom = (roomName, roomId, connection) => {
  const id = random(0, 1000000000);
  if (typeof rooms[roomName] === 'undefined') {
    rooms[roomName] = {
      roomId,
      adminId: id,
      adminConnection: connection,
      usersIds: [id],
      usersConnections: [connection],
    };
  } else {
    rooms[roomName].usersIds.push(id);
    rooms[roomName].usersConnections.push(connection);
  }
};

const sendToEveryoneInARoom = (socket, message) => {
  const foundObj = rooms.find((room) => room.adminConnection === socket);
  if (typeof foundObj !== 'undefined') {
    foundObj.usersConnections.forEach((connection) => connection.send(message));
  }
  socket.send('You have to be admin');
};

webSocketServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    const messageObj = JSON.parse(message);
    if (messageObj.method === 'connect') {
      addRoom(messageObj.field2, messageObj.field3, socket);
    } else if (
      messageObj.method === 'play'
      || messageObj.method === 'pause'
      || messageObj.method === 'stop'
    ) {
      sendToEveryoneInARoom(socket, messageObj.method);
    } else if (messageObj.method === 'new track') {
      sendToEveryoneInARoom(socket, messageObj.field1);
    } else if (messageObj.method === 'get array of rooms') {
      socket.send(JSON.stringify(rooms));
    } else if (messageObj.method === 'get room object') {
      const foundObj = rooms.find((room) => room.usersConnections.contains(socket));
      socket.send(JSON.stringify(foundObj));
    }
  });

  socket.on('close', () => {
    const foundObj = rooms.find((room) => room.adminConnection === socket);
    if (typeof foundObj !== 'undefined') {
      const roomName = rooms.findIndex(
        (room) => room.adminConnection === socket,
      );
      rooms[roomName].usersConnections.forEach((connection) => connection.send('Connection is closed'));
      delete rooms[roomName];
    } else {
      const foundCon = rooms.find((room) => room.usersConnections.contains(socket));
      const ind = foundCon.usersConnections.findIndex(socket);
      foundObj.usersConnections.splice(ind);
      foundObj.usersIds.splice(ind);
      socket.send('Connection is closed');
    }
  });
});
