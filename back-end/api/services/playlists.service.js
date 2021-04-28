/* eslint-disable comma-dangle */
/* eslint-disable radix */
/* eslint-disable camelcase */
const fs = require('fs');

const getPlaylistsService = () => {
  const playlists = fs.readFileSync('api/db/playlist.json');
  const parsePlaylists = JSON.parse(playlists).playlists;
  return parsePlaylists;
};

const getPlaylistsByUserId = (user_id) => {
  const playlists = getPlaylistsService();
  return playlists.filter((playlist) => playlist.user_id === user_id);
};

const getPlaylistByIdService = (id) => {
  const playlists = getPlaylistsService();
  return playlists.filter((playlist) => playlist.playlist_id === +id)[0];
};

module.exports = {
  getPlaylistByIdService,
  getPlaylistsByUserId,
};
