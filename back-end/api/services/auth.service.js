/* eslint-disable camelcase */
const fs = require('fs');

const getUsers = () => {
  const users = fs.readFileSync('api/db/users.json');
  return JSON.parse(users).users;
};

const setUser = (user) => {
  let users = getUsers();
  users.push(user);
  const data =  JSON.stringify({ users: users });
  try {
    fs.writeFileSync('api/db/users.json', data);
    console.log("JSON data is saved.");
  } catch (error) {
    console.error(err);
  }
}

const emailExist = (email) => {
  let users = getUsers();
  for(let i =0; i<users.length; i++){
    if(users[i].email === email){
      return true;
    }
  };
  return false;
}

const usernameExist = (username) => {
  let users = getUsers();
  for(let i =0; i<users.length; i++){
    if(users[i].username === username){
      return true;
    }
  };
  return false;
}

const getUserByEmail = (email) => {
  let users = getUsers();
  return users.filter( user => user.email == email)[0];
};

module.exports = {
  setUser,
  getUserByEmail,
  emailExist,
  usernameExist,
};
