const fs = require('fs');
const { getSongByIdService } = require('../services/songs.service');

const getPlaylistsService = () => {
  const playlists = fs.readFileSync('api/db/playlist.json');
  let parsePlaylists = JSON.parse(playlists).playlists;

  parsePlaylists = parsePlaylists.map((playlist) => ({
    ...playlist,
    tracks: playlist.tracks.map((songId) => getSongByIdService(songId)),
  }));

  return parsePlaylists;
};

const getPlaylistByIdService = (id) => {
  const playlists = getPlaylistsService();
  return playlists.filter((playlist) => playlist.playlist_id === +id)[0];
};

module.exports = {
  getPlaylistsService,
  getPlaylistByIdService,
};
