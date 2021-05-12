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
      Album_ID: albumId,
      Artist_ID: artistId,
      Category_ID: categoryId,
      Track_name: trackName,
      Lyrics: lyrics,
      Duration: duration,
      Cover: cover,
      Release_year: releaseYear,
      Time_added: new Date(),
      Track_URL: trackURL,
      Artist_List: artistList,
    })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(TRACK_INFO)
    .join(
      TRACK_CATEGORY,
      `${TRACK_INFO}.Category_ID`,
      '=',
      `${TRACK_CATEGORY}.Category_ID`
    )
    .join(ALBUM, `${TRACK_INFO}.Album_ID`, '=', `${ALBUM}.Album_ID`)
    .join(ARTIST, `${TRACK_INFO}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${TRACK_CATEGORY}.Category_Name`,
      `${ALBUM}.Album_Name`,
      `${ARTIST}.Artist_Name`,
      `${TRACK_INFO}.Track_name`,
      `${TRACK_INFO}.Lyrics`,
      `${TRACK_INFO}.Duration`,
      `${TRACK_INFO}.Cover`,
      `${TRACK_INFO}.Release_year`,
      `${TRACK_INFO}.Time_added`,
      `${TRACK_INFO}.Track_URL`,
      `${TRACK_INFO}.Artist_List`
    );
}

async function getAllOrderBy(orderBy) {
  return await knex(TRACK_INFO)
    .join(
      TRACK_CATEGORY,
      `${TRACK_INFO}.Category_ID`,
      '=',
      `${TRACK_CATEGORY}.Category_ID`
    )
    .join(ALBUM, `${TRACK_INFO}.Album_ID`, '=', `${ALBUM}.Album_ID`)
    .join(ARTIST, `${TRACK_INFO}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${TRACK_CATEGORY}.Category_Name`,
      `${ALBUM}.Album_Name`,
      `${ARTIST}.Artist_Name`,
      `${TRACK_INFO}.Track_name`,
      `${TRACK_INFO}.Lyrics`,
      `${TRACK_INFO}.Duration`,
      `${TRACK_INFO}.Cover`,
      `${TRACK_INFO}.Release_year`,
      `${TRACK_INFO}.Time_added`,
      `${TRACK_INFO}.Track_URL`,
      `${TRACK_INFO}.Artist_List`
    )
    .orderBy(orderBy);
}

async function getMore(limit, page) {
  const [{ count }] = await knex(TRACK_INFO).count();
  const offset = (page - 1) * limit;
  const tracks = await knex(TRACK_INFO)
    .join(
      TRACK_CATEGORY,
      `${TRACK_INFO}.Category_ID`,
      '=',
      `${TRACK_CATEGORY}.Category_ID`
    )
    .join(ALBUM, `${TRACK_INFO}.Album_ID`, '=', `${ALBUM}.Album_ID`)
    .join(ARTIST, `${TRACK_INFO}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${TRACK_CATEGORY}.Category_Name`,
      `${ALBUM}.Album_Name`,
      `${ARTIST}.Artist_Name`,
      `${TRACK_INFO}.Track_name`,
      `${TRACK_INFO}.Lyrics`,
      `${TRACK_INFO}.Duration`,
      `${TRACK_INFO}.Cover`,
      `${TRACK_INFO}.Release_year`,
      `${TRACK_INFO}.Time_added`,
      `${TRACK_INFO}.Track_URL`,
      `${TRACK_INFO}.Artist_List`
    )
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
    .where({ Track_ID: id })
    .join(
      TRACK_CATEGORY,
      `${TRACK_INFO}.Category_ID`,
      '=',
      `${TRACK_CATEGORY}.Category_ID`
    )
    .join(ALBUM, `${TRACK_INFO}.Album_ID`, '=', `${ALBUM}.Album_ID`)
    .join(ARTIST, `${TRACK_INFO}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${TRACK_CATEGORY}.category_name`,
      `${ALBUM}.album_name`,
      `${ARTIST}.artist_name`,
      `${ALBUM}.cover as album_cover`,
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
    .where({ Track_name: trackName })
    .join(
      TRACK_CATEGORY,
      `${TRACK_INFO}.Category_ID`,
      '=',
      `${TRACK_CATEGORY}.Category_ID`
    )
    .join(ALBUM, `${TRACK_INFO}.Album_ID`, '=', `${ALBUM}.Album_ID`)
    .join(ARTIST, `${TRACK_INFO}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${TRACK_CATEGORY}.Category_Name`,
      `${ALBUM}.Album_Name`,
      `${ARTIST}.Artist_Name`,
      `${TRACK_INFO}.Track_name`,
      `${TRACK_INFO}.Lyrics`,
      `${TRACK_INFO}.Duration`,
      `${TRACK_INFO}.Cover`,
      `${TRACK_INFO}.Release_year`,
      `${TRACK_INFO}.Time_added`,
      `${TRACK_INFO}.Track_URL`,
      `${TRACK_INFO}.Artist_List`
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

  if (artistId) updatedTrack.Artist_ID = artistId;
  if (albumId) updatedTrack.Album_ID = albumId;
  if (categoryId) updatedTrack.Category_ID = categoryId;
  if (trackName) updatedTrack.Track_name = trackName;
  if (lyrics) updatedTrack.Lyrics = lyrics;
  if (duration) updatedTrack.Duration = duration;
  if (cover) updatedTrack.Cover = cover;
  if (releaseYear) updatedTrack.Release_year = releaseYear;
  if (trackURL) updatedTrack.Track_URL = trackURL;
  if (artistList) updatedTrack.Artist_List = artistList;

  const [result] = await knex(TRACK_INFO)
    .update(updatedTrack)
    .where({ Track_ID: trackId })
    .returning('*');
  if (!result) {
    throw new DatabaseError(`No Track with trackId: ${trackId}`);
  }
  return result;
}

async function remove(id) {
  await knex(TRACK_INFO).where({ Track_ID: id }).del();
}

module.exports = (client) => {
  knex = client;

  return {
    create,
    getAll,
    getAllOrderBy,
    getMore,
    getById,
    getByTrackName,
    update,
    remove,
  };
};
