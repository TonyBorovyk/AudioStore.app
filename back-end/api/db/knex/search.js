const {
  tables: { ALBUM, ARTIST, TRACK_INFO, TRACK_CATEGORY },
} = require('../../config');
const { dbDTO } = require('../../services');

let knex;

async function global(searchString) {
  const likeString = `%${searchString}%`;

  const albums = await knex(ALBUM)
    .join(ARTIST, `${ALBUM}.artist_id`, '=', `${ARTIST}.artist_id`)
    .select(
      `${ARTIST}.artist_id`,
      `${ARTIST}.artist_name`,
      `${ALBUM}.album_id`,
      `${ALBUM}.album_name`,
      `${ALBUM}.cover`,
      `${ALBUM}.artist_list`
    )
    .where('album_name', 'like', likeString);

  const artists = await knex(ARTIST).where('artist_name', 'like', likeString);

  const tracks = await knex(TRACK_INFO)
    .join(
      TRACK_CATEGORY,
      `${TRACK_INFO}.category_id`,
      '=',
      `${TRACK_CATEGORY}.category_id`
    )
    .join(ALBUM, `${TRACK_INFO}.album_id`, '=', `${ALBUM}.album_id`)
    .join(ARTIST, `${TRACK_INFO}.artist_id`, '=', `${ARTIST}.artist_id`)
    .select(
      `${TRACK_CATEGORY}.category_name`,
      `${ALBUM}.album_name`,
      `${ARTIST}.artist_name`,
      `${TRACK_INFO}.album_id`,
      `${TRACK_INFO}.track_id`,
      `${TRACK_INFO}.artist_id`,
      `${TRACK_INFO}.category_id`,
      `${TRACK_INFO}.track_name`,
      `${TRACK_INFO}.lyrics`,
      `${TRACK_INFO}.duration`,
      `${TRACK_INFO}.cover`,
      `${TRACK_INFO}.release_year`,
      `${TRACK_INFO}.time_added`,
      `${TRACK_INFO}.track_url`,
      `${TRACK_INFO}.artist_list`
    )
    .where('track_name', 'like', likeString);

  return {
    albums: albums.map(dbDTO.albumGet),
    artists,
    tracks: tracks.map(dbDTO.trackGet),
  };
}

async function songs(searchString) {
  const likeString = `%${searchString}%`;

  const tracks = await knex(TRACK_INFO)
    .join(
      TRACK_CATEGORY,
      `${TRACK_INFO}.category_id`,
      '=',
      `${TRACK_CATEGORY}.category_id`
    )
    .join(ALBUM, `${TRACK_INFO}.album_id`, '=', `${ALBUM}.album_id`)
    .join(ARTIST, `${TRACK_INFO}.artist_id`, '=', `${ARTIST}.artist_id`)
    .select(
      `${TRACK_CATEGORY}.category_name`,
      `${ALBUM}.album_name`,
      `${ARTIST}.artist_name`,
      `${TRACK_INFO}.album_id`,
      `${TRACK_INFO}.track_id`,
      `${TRACK_INFO}.artist_id`,
      `${TRACK_INFO}.category_id`,
      `${TRACK_INFO}.track_name`,
      `${TRACK_INFO}.lyrics`,
      `${TRACK_INFO}.duration`,
      `${TRACK_INFO}.cover`,
      `${TRACK_INFO}.release_year`,
      `${TRACK_INFO}.time_added`,
      `${TRACK_INFO}.track_url`,
      `${TRACK_INFO}.artist_list`
    )
    .where('track_name', 'like', likeString);

  return tracks.map(dbDTO.trackGet);
}

module.exports = (client) => {
  knex = client;

  return {
    global,
    songs,
  };
};
