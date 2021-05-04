const WebSocketServer = require('ws');

const rooms = [];

const webSocketServer = new WebSocketServer.Server({
  port: 8081,
});

const addRoom = (messageObj, connection) => {
  rooms.push({
    roomId: messageObj.roomId,
    roomName: messageObj.roomName,
    adminId: messageObj.adminId,
    adminConnection: connection,
    usersIds: [messageObj.adminId],
    usersConnections: [connection],
  })
};

const addUserToRoom = (messageObj, connection) => {
  const neededRoom = rooms.find(room => room.roomId === messageObj.roomId);
  neededRoom.usersIds.push(messageObj.userId);
  neededRoom.usersConnections.push(connection);
};

const sendToEveryoneInARoom = (messageObj, connection) => {
  const foundObj = rooms.find((room) => room.adminConnection === connection);
  let exists;
  rooms.forEach(room => exists = room.usersConnections.includes(connection))
  if (typeof foundObj !== 'undefined') {
    foundObj.usersConnections.forEach((connection) => connection.send(JSON.stringify(messageObj)));
  } else if (typeof foundObj === 'undefined' && exists === true) {
    connection.send('You have to be admin');
  }
  else {
    connection.send('User does is not a member of any room')
  }
};

webSocketServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    const messageObj = JSON.parse(message);
    if (messageObj.method === 'create new room') {
      addRoom(messageObj, socket);
      console.log('created');
    } else if (messageObj.method === 'connect user to the room') {
      addUserToRoom(messageObj, socket);
      console.log('connected');
    } else if (
        messageObj.method === 'play'
        || messageObj.method === 'pause'
        || messageObj.method === 'stop'
    ) {
      sendToEveryoneInARoom(messageObj, socket);
      console.log(messageObj.method)
    } else if (messageObj.method === 'new track') {
      sendToEveryoneInARoom(messageObj, socket);
      console.log('track was changed')
    }
  });

  socket.on('close', () => {
    const foundObj = rooms.find((room) => room.adminConnection === socket);
    let exists;
    let index;
    rooms.forEach(room => exists = room.usersConnections.includes(socket))
    if (typeof foundObj !== 'undefined') {
      index = rooms.findIndex(
          (room) => room.adminConnection === socket,
      );
      rooms[index].usersConnections.forEach((connection) => connection.send('Connection is closed'));
      rooms.splice(index, 1);
    } else if (typeof foundObj === 'undefined' && exists === true) {
      const foundCon = rooms.find((room) => room.usersConnections.includes(socket));
      index = foundCon.usersConnections.findIndex((connection) => connection === socket);
      foundObj.usersConnections.splice(index, 1);
      foundObj.usersIds.splice(index);
      socket.send('Connection is closed');
    }
    console.log('disconnected')
  });
});