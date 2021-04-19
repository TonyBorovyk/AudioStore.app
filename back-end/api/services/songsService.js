/* eslint-disable camelcase */
const fs = require('fs');

const getAllSongs = () => {
  const data = fs.readFileSync('api/db/songs.json');
  const songs = JSON.parse(data);
  return songs;
};

const getSongsByOrder = (/* order */) => {
  const songs = getAllSongs();
  return songs;
};

const getSongById = (id) => {
  const songs = getAllSongs();
  let song_details = {};
  songs.songs.forEach((song) => {
    if (song.track_id === id) {
      song_details = song;
    }
  });
  return song_details;
};

module.exports = {
  getSongById,
  getSongsByOrder,
};
