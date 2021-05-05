const { DatabaseError } = require('../databaseError');
const {
  tables: { ARTIST },
} = require('../../config');

let knex;

async function create({ artistName }) {
  const [result] = await knex(ARTIST)
    .insert({ Artist_Name: artistName })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(ARTIST).select('*');
}

async function getById(id) {
  const response = await knex(ARTIST).where({ Artist_ID: id }).first();
  if (!response) {
    throw new DatabaseError(`No Artist with id: ${id}`);
  }
  return response;
}

async function getByArtistName(artistName) {
  const response = await knex(ARTIST)
    .where({ Artist_Name: artistName })
    .first();
  if (!response) {
    throw new DatabaseError(`No Artist with artistName: ${artistName}`);
  }
  return response;
}

async function remove(id) {
  await knex(ARTIST).where({ Artist_ID: id }).del();
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
