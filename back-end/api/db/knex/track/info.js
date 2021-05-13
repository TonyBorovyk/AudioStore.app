const { DatabaseError } = require('../../databaseError');
const {
  tables: { TRACK_INFO, TRACK_CATEGORY, ALBUM, ARTIST },
} = require('../../../config');
const {
  dbDTO: { trackAdd: addDTO, trackGet: getDTO },
} = require('../../../services');

let knex;

async function create(track) {
  const newTrack = addDTO(track);
  newTrack.time_added = new Date();

  const [result] = await knex(TRACK_INFO).insert(newTrack).returning('*');
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
    tracks: tracks.map(getDTO),
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

  return getDTO(response);
}

async function getByAlbumId(albumId) {
  const tracks = await knex(TRACK_INFO)
    .where({ [`${ALBUM}.album_id`]: albumId })
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
    );

  return tracks.map(getDTO);
}

async function getByArtistId(artistId) {
  const tracks = await knex(TRACK_INFO)
    .where({ [`${ARTIST}.artist_id`]: artistId })
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
    );

  return tracks.map(getDTO);
}

async function update({ trackId, ...track }) {
  const updatedTrack = addDTO(track);

  const [result] = await knex(TRACK_INFO)
    .update(updatedTrack)
    .where({ track_id: trackId })
    .returning('*');

  if (!result) {
    throw new DatabaseError(`No Track with trackId: ${trackId}`);
  }

  return getDTO(result);
}

async function remove(id) {
  await knex(TRACK_INFO).where({ track_id: id }).del();
}

module.exports = (client) => {
  knex = client;

  return {
    create,
    getAll,
    getById,
    getByAlbumId,
    getByArtistId,
    update,
    remove,
  };
};
