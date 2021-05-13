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
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
      role,
    })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(USER).select('*');
}

async function getById(id) {
  return await knex(USER).where({ user_id: id }).first();
}

async function getByEmail(email) {
  return await knex(USER).where({ email }).first();
}

async function emailExists(email) {
  const user = await knex(USER).where({ email }).first();
  if (user) {
    return true;
  }
  return false;
}

async function usernameExists(username) {
  const user = await knex(USER).where({ username }).first();
  if (user) {
    return true;
  }
  return false;
}

async function remove(id) {
  await knex(USER).where({ user_id: id }).del();
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
