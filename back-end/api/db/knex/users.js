const {
  tables: { USER },
} = require('../../config');

let knex;

async function create({
  firstName,
  lastName,
  username,
  email,
  password,
  role,
}) {
  const [result] = await knex(USER)
    .insert({
      First_name: firstName,
      Last_name: lastName,
      UserName: username,
      Email: email,
      Password: password,
      Role: role,
    })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(USER).select('*');
}

async function getById(id) {
  return await knex(USER).where({ User_ID: id }).first();
}

async function getByEmail(email) {
  return await knex(USER).where({ Email: email }).first();
}

async function emailExists(email) {
  const user = await knex(USER).where({ Email: email }).first();
  if (user) {
    return true;
  }
  return false;
}

async function usernameExists(username) {
  const user = await knex(USER).where({ UserName: username }).first();
  if (user) {
    return true;
  }
  return false;
}

async function remove(id) {
  await knex(USER).where({ User_ID: id }).del();
}

module.exports = (client) => {
  knex = client;

  return {
    create,
    getAll,
    getById,
    getByEmail,
    emailExists,
    usernameExists,
    remove,
  };
};
