const WebSocketServer = require('ws');

const rooms = [];

const webSocketServer = new WebSocketServer.Server({
  port: 8081,
});

const addRoom = (roomId, roomName, adminId, connection) => {
  rooms.push({
    roomId,
    roomName,
    adminId,
    adminConnection: connection,
    usersIds: [adminId],
    usersConnections: [connection],
  })
};

const addUserToRoom = (roomId, userId, connection) => {
  const neededRoom = rooms.find(room => room.roomId === roomId);
  neededRoom.usersIds.push(userId);
  neededRoom.usersConnections.push(connection);
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
  socket.on('message', (message) => {
    const messageObj = JSON.parse(message);
    if (messageObj.method === 'create new room') {
      addRoom(messageObj.roomId, messageObj.roomName, messageObj.adminId, socket);
    } else if (messageObj.method === 'connect user to the room') {
      addUserToRoom(messageObj.roomId, messageObj.adminId, socket);
    } else if (
        messageObj.method === 'play'
        || messageObj.method === 'pause'
        || messageObj.method === 'stop'
    ) {
      sendToEveryoneInARoom(socket, messageObj.method);
    } else if (messageObj.method === 'new track') {
      sendToEveryoneInARoom(socket, JSON.stringify(messageObj));
    }
  });

  socket.on('close', () => {
    const foundObj = rooms.find((room) => room.adminConnection === socket);
    if (typeof foundObj !== 'undefined') {
      const roomId = rooms.findIndex(
          (room) => room.adminConnection === socket,
      );
      rooms.find(room => roomId).usersConnections.forEach((connection) => connection.send('Connection is closed'));
      delete rooms.find(room => roomId);
    } else {
      const foundCon = rooms.find((room) => room.usersConnections.contains(socket));
      const ind = foundCon.usersConnections.findIndex(socket);
      foundObj.usersConnections.splice(ind);
      foundObj.usersIds.splice(ind);
      socket.send('Connection is closed');
    }
  });
});