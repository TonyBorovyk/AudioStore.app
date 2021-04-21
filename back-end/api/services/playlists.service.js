const fs = require('fs');

const getPlaylistsService = () => {
  const playlists = fs.readFileSync('api/db/playlist.json');
  return JSON.parse(playlists).playlists;
};

const getPlaylistByIdService = (id) => {
  const playlists = getPlaylistsService();
  return playlists.filter((playlist) => playlist.playlist_id === id)[0];
};

module.exports = {
  getPlaylistsService,
  getPlaylistByIdService,
};
