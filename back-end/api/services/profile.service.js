/* eslint-disable camelcase */
const fs = require('fs');

const getUsers = () => {
  const users = fs.readFileSync('api/db/users.json');
  return JSON.parse(users).users;
};

const getUserById = (id) => {
  let users = getUsers();
  return users.filter( user => user.user_id == id)[0];
};

module.exports = {
  getUserById,
};
