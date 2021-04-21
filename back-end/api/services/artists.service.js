/* eslint-disable radix */
const fs = require('fs');

const getArtistsService = () => {
  const artists = fs.readFileSync('api/db/artists.json');
  return JSON.parse(artists).artists;
};

const getArtistByIdService = (id) => {
  const artists = getArtistsService();
  return artists.filter((artist) => artist.artist_id === +id)[0];
};

module.exports = {
  getArtistsService,
  getArtistByIdService,
};
