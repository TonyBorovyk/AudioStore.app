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
  // await knex.raw(`
  //   DROP TABLE IF EXISTS "${tables.TRACK_INFO}";
  //   DROP TABLE IF EXISTS "${tables.PLAYLIST}";
  //   DROP TABLE IF EXISTS "${tables.ALBUM}";
  //   DROP TABLE IF EXISTS "${tables.ROOM}";
  //   DROP TABLE IF EXISTS "${tables.USER}";
  //   DROP TABLE IF EXISTS "${tables.TRACK_CATEGORY}";
  //   DROP TABLE IF EXISTS "${tables.ARTIST}";
  // `);

  await knex.raw(`
    CREATE TABLE IF NOT EXISTS "${tables.ARTIST}" (
        "Artist_ID" SERIAL PRIMARY KEY NOT NULL,
        "Artist_Name" varchar(70) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "${tables.TRACK_CATEGORY}" (
        "Category_ID" SERIAL PRIMARY KEY NOT NULL,
        "Category_Name" varchar(70) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "${tables.USER}" (
        "User_ID" SERIAL PRIMARY KEY NOT NULL,
        "First_name" varchar(60) NOT NULL,
        "Last_name" varchar(70) NOT NULL,
        "UserName" varchar(60) NOT NULL,
        "Email" varchar(100) NOT NULL,
        "Password" varchar(50) NOT NULL,
        "Role" varchar(10) NOT NULL default 'base'
    );

    CREATE TABLE IF NOT EXISTS "${tables.ROOM}" (
        "Room_ID" SERIAL PRIMARY KEY NOT NULL,
        "Admin_ID" bigint NOT NULL,
        "Room_Name" varchar(255) NOT NULL,
      CONSTRAINT "Room_fk0" FOREIGN KEY ("Admin_ID") REFERENCES "User"("User_ID") ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "${tables.ALBUM}" (
        "Album_ID" SERIAL PRIMARY KEY  NOT NULL,
        "Album_Name" varchar(70) NOT NULL,
        "Artist_ID" bigint NOT NULL,
        "Cover" TEXT,
        "Artist_List" TEXT NOT NULL,
      CONSTRAINT "Album_fk0" FOREIGN KEY ("Artist_ID") REFERENCES "Artist"("Artist_ID") ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "${tables.PLAYLIST}" (
        "Playlist_ID" SERIAL PRIMARY KEY NOT NULL,
        "Playlist_title" varchar(80) NOT NULL,
        "User_ID" bigint NOT NULL,
        "Last_update" TIMESTAMP NOT NULL,
        "Track_List" TEXT NOT NULL,
      CONSTRAINT "Playlist_fk0" FOREIGN KEY ("User_ID") REFERENCES "User"("User_ID") ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "${tables.TRACK_INFO}" (
        "Track_ID" SERIAL PRIMARY KEY NOT NULL,
        "Album_ID" bigint,
        "Artist_ID" bigint NOT NULL,
        "Category_ID" bigint,
        "Track_name" varchar(100) NOT NULL,
        "Lyrics" TEXT,
        "Duration" varchar(40) NOT NULL,
        "Cover" TEXT,
        "Release_year" int NOT NULL,
        "Time_added" TIMESTAMP,
        "Track_URL" TEXT NOT NULL,
        "Artist_List" TEXT NOT NULL,
      CONSTRAINT "Track_Info_fk0" FOREIGN KEY ("Album_ID") REFERENCES "Album"("Album_ID") ON DELETE CASCADE,
      CONSTRAINT "Track_Info_fk1" FOREIGN KEY ("Artist_ID") REFERENCES "Artist"("Artist_ID") ON DELETE CASCADE,
      CONSTRAINT "Track_Info_fk2" FOREIGN KEY ("Category_ID") REFERENCES "Track_Category"("Category_ID") ON DELETE CASCADE
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
