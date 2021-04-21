/* eslint-disable comma-dangle */
/* eslint-disable radix */
/* eslint-disable camelcase */
const fs = require('fs');

const getPlaylistsService = () => {
  const playlists = fs.readFileSync('api/db/playlist.json');
  return JSON.parse(playlists).playlists;
};

const getPlaylistsByUserId = (user_id) => {
  const playlists = getPlaylistsService();
  return playlists.filter((playlist) => playlist.user_id === user_id);
};

const getPlaylistByIdService = (id) => {
  const playlists = getPlaylistsService();
  return playlists.filter(
    (playlist) => playlist.playlist_id === parseInt(id)
  )[0];
};

module.exports = {
  getPlaylistByIdService,
  getPlaylistsByUserId,
};
