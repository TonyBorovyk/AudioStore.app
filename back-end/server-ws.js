const WebSocketServer = require('ws');

const rooms = [];

const webSocketServer = new WebSocketServer.Server({
  port: 8081,
});

const addRoom = (roomId, roomName, adminId, connection) => {
  rooms[roomId] = {
    roomId,
    roomName,
    adminId,
    adminConnection: connection,
    usersIds: [adminId],
    usersConnections: [connection],
  };
};

const addUserToRoom = (roomId, userId, connection) => {
  rooms[roomId].usersIds.push(userId);
  rooms[roomId].usersConnections.push(connection);
};

const sendToEveryoneInARoom = (socket, message) => {
  const foundObj = rooms.filter((room) => room.roomId === message.roomId);
  if (typeof foundObj !== 'undefined') {
    foundObj.usersConnections.map((connection) => connection.send(message));
  } else {
    socket.send('You have to be admin');
  }
};

webSocketServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    const messageObj = JSON.parse(message);
    if (messageObj.method === 'create new room') {
      addRoom(
        messageObj.roomId,
        messageObj.roomName,
        messageObj.adminId,
        socket
      );
      console.log('created');
    } else if (messageObj.method === 'connect user to the room') {
      addUserToRoom(messageObj.roomId, messageObj.adminId, socket);
      console.log('connected');
    } else if (
      messageObj.method === 'play' ||
      messageObj.method === 'pause' ||
      messageObj.method === 'stop'
    ) {
      sendToEveryoneInARoom(socket, messageObj);
    } else if (messageObj.method === 'new track') {
      sendToEveryoneInARoom(socket, JSON.stringify(messageObj));
    }
  });

  socket.on('close', () => {
    const foundObj = rooms.filter((room) => room.adminConnection === socket);
    if (typeof foundObj !== 'undefined') {
      const roomName = rooms.map((room, index) => {
        if (room.adminConnection === socket) return index;
      });
      rooms[roomName[1]].usersConnections.map((connection) =>
        connection.send('Connection is closed')
      );
      delete rooms[roomName[1]];
    } else {
      const foundCon = rooms.filter((room) =>
        room.usersConnections.contains(socket)
      );
      const ind = foundCon.usersConnections.findIndex(socket);
      foundObj.usersConnections.splice(ind);
      foundObj.usersIds.splice(ind);
      socket.send('Connection is closed');
    }
    
    console.log("closed");
  });
});
