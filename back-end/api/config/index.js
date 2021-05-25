const path = require('path');
require('dotenv').config({
  path: path.join(process.cwd(), 'back-end', '.env'),
});

// eslint-disable-next-line no-unused-vars
const fatalError = require('../utils/fatalError.js');

module.exports = {
  tables: {
    ARTIST: 'artist',
    TRACK_CATEGORY: 'track_category',
    USER: 'user',
    ROOM: 'room',
    ALBUM: 'album',
    PLAYLIST: 'playlist',
    TRACK_INFO: 'track_info',
  },

  errors: {
    DATABASE: 'DatabaseError',
  },

  db: {
    defaultType: process.env.DB_WRAPPER_TYPE || 'knex',

    names: {
      KNEX: 'knex',
    },

    config: {
      knex: {
        client: 'postgresql',
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
        },
        pool: {
          min: 2,
          max: 10,
        },
        debug: true,
      },
    },
  },
};
