/* eslint-disable radix */
/* eslint-disable camelcase */
const fs = require('fs');

const getAllSongsService = () => {
  const songs = fs.readFileSync('api/db/songs.json');
  return JSON.parse(songs).songs;
};

const getAllSongsByOrdersService = () => {
  const songs = getAllSongsService();
  return songs;
};

const getSongByIdService = (id) => {
  const songs = getAllSongsService();
  return songs.filter((song) => song.track_id === parseInt(id))[0];
};

module.exports = {
  getAllSongsService,
  getSongByIdService,
  getAllSongsByOrdersService,
};
