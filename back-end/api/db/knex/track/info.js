const { DatabaseError } = require('../../databaseError');
const {
  tables: { TRACK_INFO, TRACK_CATEGORY, ALBUM, ARTIST },
} = require('../../../config');

let knex;

async function create({
  albumId,
  artistId,
  categoryId,
  trackName,
  lyrics,
  duration,
  cover,
  releaseYear,
  trackURL,
  artistList,
}) {
  const [result] = await knex(TRACK_INFO)
    .insert({
      album_id: albumId,
      artist_id: artistId,
      category_id: categoryId,
      track_name: trackName,
      lyrics,
      duration,
      cover,
      release_year: releaseYear,
      time_added: new Date(),
      track_url: trackURL,
      artist_list: artistList,
    })
    .returning('*');
  return result;
}

async function getAll(orderBy, sortDesk, limit, page) {
  const [{ count }] = await knex(TRACK_INFO).count();
  const offset = (page - 1) * limit;
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
    .orderBy(orderBy, sortDesk ? 'desc' : 'asc')
    .limit(limit)
    .offset(offset);

  const total = Number(count);

  return {
    total: total,
    totalPages: Math.ceil(total / limit),
    tracks,
  };
}

async function getById(id) {
  const response = await knex(TRACK_INFO)
    .where({ track_id: id })
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
    .first();
  if (!response) {
    throw new DatabaseError(`No TrackInfo with id: ${id}`);
  }
  return response;
}

async function getByTrackName(trackName) {
  const response = await knex(TRACK_INFO)
    .where({ track_name: trackName })
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
    .first();
  if (!response) {
    throw new DatabaseError(`No TrackInfo with trackName: ${trackName}`);
  }
  return response;
}

async function update({
  trackId,
  albumId,
  artistId,
  categoryId,
  trackName,
  lyrics,
  duration,
  cover,
  releaseYear,
  trackURL,
  artistList,
}) {
  const updatedTrack = {};

  if (albumId) updatedTrack.album_id = albumId;
  if (artistId) updatedTrack.artist_id = artistId;
  if (categoryId) updatedTrack.category_id = categoryId;
  if (trackName) updatedTrack.track_name = trackName;
  if (lyrics) updatedTrack.lyrics = lyrics;
  if (duration) updatedTrack.duration = duration;
  if (cover) updatedTrack.cover = cover;
  if (releaseYear) updatedTrack.release_year = releaseYear;
  if (trackURL) updatedTrack.track_url = trackURL;
  if (artistList) updatedTrack.artist_list = artistList;

  const [result] = await knex(TRACK_INFO)
    .update(updatedTrack)
    .where({ track_id: trackId })
    .returning('*');
  if (!result) {
    throw new DatabaseError(`No Track with trackId: ${trackId}`);
  }
  return result;
}

async function remove(id) {
  await knex(TRACK_INFO).where({ track_id: id }).del();
}

module.exports = (client) => {
  knex = client;

  return {
    create,
    getAll,
    // getAllOrderBy,
    // getMore,
    getById,
    getByTrackName,
    update,
    remove,
  };
};
