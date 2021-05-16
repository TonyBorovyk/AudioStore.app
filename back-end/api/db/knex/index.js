const Knex = require('knex');
const path = require('path');
const fsp = require('fs').promises;

const {
  db: {
    names: { KNEX },
  },
} = require('../../config');

const dbAlbums = require('./albums');
const dbArtists = require('./artists');
const dbPlaylist = require('./playlist');
const dbTrack = require('./track');
const dbUsers = require('./users');
const dbSearch = require('./search');
const dbRooms = require('./rooms');

let knex;

const throwIfInvalid = (isValid, message = '') => {
  if (!isValid) {
    console.error(message);
    process.exit(1);
  }

  return true;
};

async function createDBWithTablesIfNotExists() {
  const createTablesSQL = (
    await fsp.readFile(
      path.join(process.cwd(), 'api', 'db', 'migration', 'createTables.sql')
    )
  ).toString();
  await knex.raw(createTablesSQL);

  return true;
}

async function testConnection() {
  console.log(`Hello from ${KNEX} testConnection`);

  await knex.raw('SELECT NOW()');
}

async function close() {
  console.log(`INFO: Closing ${KNEX} DB wrapper`);
}

module.exports = (config) => {
  throwIfInvalid(config, 'No config!');

  knex = new Knex(config);

  const albums = dbAlbums(knex);
  const artists = dbArtists(knex);
  const playlist = dbPlaylist(knex);
  const track = dbTrack(knex);
  const users = dbUsers(knex);
  const search = dbSearch(knex);
  const rooms = dbRooms(knex);

  return {
    createDBWithTablesIfNotExists,
    testConnection,
    close,

    // --------------

    albums,
    artists,
    playlist,
    track,
    users,
    search,
    rooms,
  };
};
