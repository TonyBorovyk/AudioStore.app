const fs = require('fs');

const getPlaylistsService = () => {
  const data = fs.readFileSync('api/db/exampleReq.json');
  return JSON.parse(data).playlists;
};

const getPlaylistByIdService = (id) => {
  const playlists = getPlaylistsService();
  return playlists.filter( playlist => playlist.playlist_id == id)[0];
};

module.exports = {
  getPlaylistsService,
  getPlaylistByIdService,
};
