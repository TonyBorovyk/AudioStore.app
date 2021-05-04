const { DatabaseError } = require('../../databaseError');
const {
  tables: { TRACK_CATEGORY },
} = require('../../../config');

let knex;

async function create({ categoryName }) {
  const [result] = await knex(TRACK_CATEGORY)
    .insert({ Category_Name: categoryName })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(TRACK_CATEGORY).select('*');
}

async function getById(id) {
  const response = await knex(TRACK_CATEGORY)
    .where({ Category_ID: id })
    .first();
  if (!response) {
    throw new DatabaseError(`No TrackCategory with id: ${id}`);
  }
  return response;
}

async function getByCategoryName(categoryName) {
  const response = await knex(TRACK_CATEGORY)
    .where({ Category_Name: categoryName })
    .first();
  if (!response) {
    throw new DatabaseError(
      `No TrackCategory with categoryName: ${categoryName}`
    );
  }
  return response;
}

async function remove(id) {
  await knex(TRACK_CATEGORY).where({ Category_ID: id }).del();
}

module.exports = (client) => {
  knex = client;

  return {
    create,
    getAll,
    getById,
    getByCategoryName,
    remove,
  };
};
