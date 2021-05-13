const { DatabaseError } = require('../databaseError');
const {
  tables: { PLAYLIST },
} = require('../../config');
const {
  dbDTO: { playlistAdd: addDTO, playlistGet: getDTO },
} = require('../../services');

let knex;

async function create(playlist) {
  const newPlaylist = addDTO(playlist);
  newPlaylist.last_update = new Date();

  const [result] = await knex(PLAYLIST).insert(newPlaylist).returning('*');
  return getDTO(result);
}

async function getAll() {
  const result = await knex(PLAYLIST).select('*');
  return result.map(getDTO);
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
  return getDTO(response);
}

async function getByPlaylistTitle(playlistTitle) {
  const response = await knex(PLAYLIST)
    .where({ playlist_title: playlistTitle })
    .first();
  if (!response) {
    throw new DatabaseError(`No Playlist with playlistTitle: ${playlistTitle}`);
  }
  return getDTO(response);
}

async function getByUserId(userId) {
  const response = await knex(PLAYLIST).where({ user_id: userId }).first();
  if (!response) {
    throw new DatabaseError(`No Playlist with userId: ${userId}`);
  }
  return getDTO(response);
}

async function update({
  playlist_id: playlistId,
  user_id: userId,
  ...playlist
}) {
  const updatedPlaylist = addDTO(playlist);
  updatedPlaylist.last_update = new Date();

  const [response] = await knex(PLAYLIST)
    .update(updatedPlaylist)
    .where({ playlist_id: playlistId, user_id: userId })
    .returning('*');
  return getDTO(response);
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
