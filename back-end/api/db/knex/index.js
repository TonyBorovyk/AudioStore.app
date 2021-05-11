const Knex = require('knex');

const {
  db: {
    names: { KNEX },
  },
  tables,
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
  await knex.raw(`
    DROP TABLE IF EXISTS "${tables.TRACK_INFO}";
    DROP TABLE IF EXISTS "${tables.PLAYLIST}";
    DROP TABLE IF EXISTS "${tables.ALBUM}";
    DROP TABLE IF EXISTS "${tables.ROOM}";
    DROP TABLE IF EXISTS "${tables.USER}";
    DROP TABLE IF EXISTS "${tables.TRACK_CATEGORY}";
    DROP TABLE IF EXISTS "${tables.ARTIST}";
  `);

  await knex.raw(`
    CREATE TABLE IF NOT EXISTS "${tables.ARTIST}" (
        "artist_id" SERIAL PRIMARY KEY NOT NULL,
        "artist_name" varchar(70) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "${tables.TRACK_CATEGORY}" (
        "category_id" SERIAL PRIMARY KEY NOT NULL,
        "category_name" varchar(70) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "${tables.USER}" (
        "user_id" SERIAL PRIMARY KEY NOT NULL,
        "first_name" varchar(60) NOT NULL,
        "last_name" varchar(70) NOT NULL,
        "username" varchar(60) NOT NULL,
        "email" varchar(100) NOT NULL,
        "password" varchar(150) NOT NULL,
        "role" varchar(10) NOT NULL default 'base'
    );

    CREATE TABLE IF NOT EXISTS "${tables.ROOM}" (
        "room_id" SERIAL PRIMARY KEY NOT NULL,
        "admin_id" bigint NOT NULL,
        "room_name" varchar(255) NOT NULL,
      CONSTRAINT "room_fk0" FOREIGN KEY ("admin_id") REFERENCES "user"("user_id") ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "${tables.ALBUM}" (
        "album_id" SERIAL PRIMARY KEY  NOT NULL,
        "album_name" varchar(70) NOT NULL,
        "artist_id" bigint NOT NULL,
        "cover" TEXT,
        "artist_list" TEXT NOT NULL,
      CONSTRAINT "album_fk0" FOREIGN KEY ("artist_id") REFERENCES "artist"("artist_id") ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "${tables.PLAYLIST}" (
        "playlist_id" SERIAL PRIMARY KEY NOT NULL,
        "playlist_title" varchar(80) NOT NULL,
        "user_id" bigint NOT NULL,
        "last_update" TIMESTAMP NOT NULL,
        "track_list" TEXT NOT NULL,
      CONSTRAINT "playlist_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "${tables.TRACK_INFO}" (
        "track_id" SERIAL PRIMARY KEY NOT NULL,
        "album_id" bigint,
        "artist_id" bigint NOT NULL,
        "category_id" bigint,
        "track_name" varchar(100) NOT NULL,
        "lyrics" TEXT,
        "duration" varchar(40) NOT NULL,
        "cover" TEXT,
        "release_year" int NOT NULL,
        "time_added" TIMESTAMP,
        "track_url" TEXT NOT NULL,
        "artist_list" TEXT NOT NULL,
      CONSTRAINT "track_Info_fk0" FOREIGN KEY ("album_id") REFERENCES "album"("album_id") ON DELETE CASCADE,
      CONSTRAINT "track_Info_fk1" FOREIGN KEY ("artist_id") REFERENCES "artist"("artist_id") ON DELETE CASCADE,
      CONSTRAINT "track_Info_fk2" FOREIGN KEY ("category_id") REFERENCES "track_category"("category_id") ON DELETE CASCADE
    );`);

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
