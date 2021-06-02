const WebSocketServer = require('ws');
const http = require('http');

require('dotenv').config();

const rooms = [];

const server = http.createServer();

const webSocketServer = new WebSocketServer.Server({ server });

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
  if (typeof neededRoom !== 'undefined') {
    neededRoom.usersIds.push(messageObj.userId);
    neededRoom.usersConnections.push(connection);
    neededRoom.adminConnection.send(JSON.stringify(messageObj));
  } else {
    connection.send('No such a room found');
    console.log('No such a room found');
  }
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

const sendInfoAfterConnection = messageObj  => {
  const userRoom = rooms.find(room => room.roomId === messageObj.roomId);
  const index = userRoom.usersIds.findIndex(id => id === messageObj.userId);
  const userConnection = userRoom.usersConnections[index];
  userConnection.send(JSON.stringify({
    method: 'new track',
    songId: messageObj.songId
  }));
  if (messageObj.play === true) {
    userConnection.send(JSON.stringify({
      method: 'play'
    }));
  } else {
    userConnection.send(JSON.stringify({
      method: 'pause'
    }));
  }
  userConnection.send(JSON.stringify({
    method: 'new time',
    new_time: messageObj.new_time
  }));
}

const HANDLERS = {
  'create new room': addRoom,
  'connect user to the room': addUserToRoom,
  'just connected': sendInfoAfterConnection,
  'play': sendToEveryoneInARoom,
  'pause': sendToEveryoneInARoom,
  'stop': sendToEveryoneInARoom,
  'new track': sendToEveryoneInARoom,
  'new time': sendToEveryoneInARoom,
}

const adminDisconnected = (foundObj, socket) => {
  const index = rooms.findIndex(
    (room) => room.adminConnection === socket,
  );
  rooms[index].usersConnections.forEach((connection) => connection.send(JSON.stringify({
    method: 'Connection is closed'
  })));
  rooms.splice(index, 1);
  console.log('disconnected admin');
}

const userDisconnected = (socket) => {
  const foundCon = rooms.find((room) => room.usersConnections.includes(socket));
  const index = foundCon.usersConnections.findIndex((connection) => connection === socket);
  foundCon.usersConnections.splice(index);
  foundCon.usersIds.splice(index);
  console.log('disconnected user');
}

const responseOnClose = (socket) => {
  const foundObj = rooms.find((room) => room.adminConnection === socket);
  let exists;
  rooms.forEach(room => exists = room.usersConnections.includes(socket))
  if (typeof foundObj !== 'undefined') {
    adminDisconnected(foundObj, socket);
  } else if (typeof foundObj === 'undefined' && exists === true) {
    userDisconnected(socket);
  }
}

webSocketServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    const messageObj = JSON.parse(message);
    HANDLERS[messageObj.method](messageObj, socket);
  });

  socket.on('close', () => {
    responseOnClose(socket)
  });
});

server.listen(process.env.PORT || 8000, process.env.HOST || '0.0.0.0', () => {
  console.log(`websocket listening on on port ${process.env.PORT}`);
});
