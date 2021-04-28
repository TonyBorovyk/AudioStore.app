/*var socket = new WebSocket("ws://localhost:8081");

// A function to check if string contains JSON
const isJson = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// Function can get different number of arguments
const sendMessage = () => {
  if (arguments[0] === "create new room") {
    const obj = {
      method: arguments[0],
      roomId: arguments[1],
      roomName: arguments[2],
      adminId: arguments[3]
    };
  } else if (arguments[0] === "connect user to the room") {
    const obj = {
      method: arguments[0],
      roomId: arguments[1],
      adminId: arguments[2]
    };
  } else if (arguments[0] === "new track") {
    const obj = {
      method: arguments[0],
      trackId: arguments[1]
    };
  } else if (arguments[0] === 'play'
    || arguments[0] === 'pause'
    || arguments[0] === 'stop'
    || arguments[0] === 'get array of rooms'
    || arguments[0] === 'get room object'
  ) {
    const obj = {
      method: arguments[0]
    };
  }
};

socket.onmessage = function(event) {
  const message = event.data;
  if (message === "play") {

  } else if (message === "pause") {

  } else if (message === "stop") {

  } else if (message instanceof Map) {
    // When client gets the map of room objects

  } else if (isJson(message)) {
    // When client gets room object

  } else {
    // When client gets id of the room

  }
};

webSocket.onerror = function(event) {

};*/