const { DatabaseError } = require('../databaseError');
const {
  tables: { PLAYLIST },
} = require('../../config');

let knex;

async function create({ playlistTitle, userId, trackList }) {
  const [result] = await knex(PLAYLIST)
    .insert({
      playlist_title: playlistTitle,
      user_id: userId,
      last_update: new Date(),
      track_list: trackList,
    })
    .returning('*');
  return result;
}

async function getAll() {
  return await knex(PLAYLIST).select('*');
}

async function getById(id, userId) {
  const where = { playlist_id: id };
  if (userId) {
    where.user_id = userId;
  }
  const response = await knex(PLAYLIST).where(where).first();
  if (!response) {
    throw new DatabaseError(`No Playlist with id: ${id}`);
  }
  return response;
}

async function getByPlaylistTitle(playlistTitle) {
  const response = await knex(PLAYLIST)
    .where({ playlist_title: playlistTitle })
    .first();
  if (!response) {
    throw new DatabaseError(`No Playlist with playlistTitle: ${playlistTitle}`);
  }
  return response;
}

async function getByUserId(userId) {
  const response = await knex(PLAYLIST).where({ user_id: userId }).first();
  if (!response) {
    throw new DatabaseError(`No Playlist with userId: ${userId}`);
  }
  return response;
}

async function update({ playlistId, userId, playlistTitle, trackList }) {
  const updatedPlaylist = {
    last_update: new Date(),
  };

  if (playlistTitle) updatedPlaylist.playlist_title = playlistTitle;
  if (trackList) updatedPlaylist.track_list = trackList;

  const [response] = await knex(PLAYLIST)
    .update(updatedPlaylist)
    .where({ playlist_id: playlistId, user_id: userId })
    .returning('*');
  return response;
}

async function remove(id) {
  await knex(PLAYLIST).where({ playlist_id: id }).del();
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
