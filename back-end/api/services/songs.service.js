/* eslint-disable camelcase */
const fs = require('fs');

const getAllSongsService = () => {
  const data = fs.readFileSync('api/db/exampleReq.json');
  return JSON.parse(data).song_details;
};
const getLastAddedSongsService = () => {
  const data = fs.readFileSync('api/db/exampleReq.json');
  return JSON.parse(data).last_added_songs;
};
const getSongByIdService = (id) => {
  const songs = getAllSongsService();
  return songs.filter( song => song.track_id == id)[0];
};

module.exports = {
  getAllSongsService,
  getLastAddedSongsService,
  getSongByIdService,
};
