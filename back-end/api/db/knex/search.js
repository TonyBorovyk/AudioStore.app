const {
  tables: { ALBUM, ARTIST, PLAYLIST, TRACK_INFO, TRACK_CATEGORY },
} = require('../../config');

let knex;

async function global(searchString) {
  const likeString = `%${searchString}%`;

  const albums = await knex(ALBUM)
    .join(ARTIST, `${ALBUM}.Artist_ID`, '=', `${ARTIST}.Artist_ID`)
    .select(
      `${ARTIST}.Artist_Name`,
      `${ALBUM}.Album_Name`,
      `${ALBUM}.Cover`,
      `${ALBUM}.Artist_List`
    )
    .where('Album_Name', 'like', likeString);

  const artists = await knex(ARTIST).where('Artist_Name', 'like', likeString);

  const playlists = await knex(PLAYLIST).where(
    'Playlist_title',
    'like',
    likeString
  );

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
    .where('Track_name', 'like', likeString);

  return { albums, artists, playlists, tracks };
}

async function songs(searchString) {
  const likeString = `%${searchString}%`;

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
    .where('Track_name', 'like', likeString);
}

module.exports = (client) => {
  knex = client;

  return {
    global,
    songs,
  };
};
