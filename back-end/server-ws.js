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

webSocketServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    const messageObj = JSON.parse(message);
    if (messageObj.method === 'create new room') {
      addRoom(messageObj, socket);
      console.log('created');
    } else if (messageObj.method === 'connect user to the room') {
      addUserToRoom(messageObj, socket);
      console.log('connected');
    } else if (messageObj.method === 'just connected') {
      sendInfoAfterConnection(messageObj);
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
    } else if (messageObj.method === 'new time') {
      sendToEveryoneInARoom(messageObj, socket);
      console.log('time changed')
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
      console.log('disconnected admin');
    } else if (typeof foundObj === 'undefined' && exists === true) {
      const foundCon = rooms.find((room) => room.usersConnections.includes(socket));
      index = foundCon.usersConnections.findIndex((connection) => connection === socket);
      foundCon.usersConnections.splice(index);
      foundCon.usersIds.splice(index);
      socket.send('Connection is closed');
      console.log('disconnected user');
    }
  });
});
