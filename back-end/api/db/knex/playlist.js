const { DatabaseError } = require('../databaseError');
const {
  tables: { PLAYLIST },
} = require('../../config');

let knex;

async function create({ playlistTitle, userId, trackList }) {
  const [result] = await knex(PLAYLIST)
    .insert({
      Playlist_title: playlistTitle,
      User_ID: userId,
      Last_update: new Date(),
      Track_List: trackList,
    })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(PLAYLIST).select('*');
}

async function getById(id, userId) {
  const where = { Playlist_ID: id };
  if (userId) {
    where.User_ID = userId;
  }
  const response = await knex(PLAYLIST).where(where).first();
  if (!response) {
    throw new DatabaseError(`No Playlist with id: ${id}`);
  }
  return response;
}

async function getByPlaylistTitle(playlistTitle) {
  const response = await knex(PLAYLIST)
    .where({ Playlist_title: playlistTitle })
    .first();
  if (!response) {
    throw new DatabaseError(`No Playlist with playlistTitle: ${playlistTitle}`);
  }
  return response;
}

async function getByUserId(userId) {
  const response = await knex(PLAYLIST).where({ User_ID: userId }).first();
  if (!response) {
    throw new DatabaseError(`No Playlist with userId: ${userId}`);
  }
  return response;
}

async function update({ playlistId, userId, playlistTitle, trackList }) {
  const updatedPlaylist = {
    Last_update: new Date(),
  };

  if (playlistTitle) updatedPlaylist.Playlist_title = playlistTitle;
  if (trackList) updatedPlaylist.Track_List = trackList;

  const [response] = await knex(PLAYLIST)
    .update(updatedPlaylist)
    .where({ Playlist_ID: playlistId, User_ID: userId })
    .returning('*');
  return response;
}

async function remove(id) {
  await knex(PLAYLIST).where({ Playlist_ID: id }).del();
}

module.exports = (client) => {
  knex = client;

  return {
    create,
    getAll,
    getById,
    getByUserId,
    getByPlaylistTitle,
    update,
    remove,
  };
};
