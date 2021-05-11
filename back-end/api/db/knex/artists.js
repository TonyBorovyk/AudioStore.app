const { DatabaseError } = require('../databaseError');
const {
  tables: { ARTIST },
} = require('../../config');

let knex;

async function create({ artistName }) {
  const [result] = await knex(ARTIST)
    .insert({ artist_name: artistName })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(ARTIST).select('*');
}

async function getById(id) {
  const response = await knex(ARTIST).where({ artist_id: id }).first();
  if (!response) {
    throw new DatabaseError(`No Artist with id: ${id}`);
  }
  return response;
}

async function getByArtistName(artistName) {
  const response = await knex(ARTIST)
    .where({ artist_name: artistName })
    .first();
  if (!response) {
    throw new DatabaseError(`No Artist with artistName: ${artistName}`);
  }
  return response;
}

async function remove(id) {
  await knex(ARTIST).where({ artist_id: id }).del();
}

module.exports = (client) => {
  knex = client;

  return {
    create,
    getAll,
    getById,
    getByArtistName,
    remove,
  };
};
