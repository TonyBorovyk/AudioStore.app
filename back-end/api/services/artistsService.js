/* eslint-disable camelcase */
const fs = require('fs');

const getAllArtists = () => {
  const data = fs.readFileSync('api/db/artists.json');
  const artists = JSON.parse(data);
  return artists;
};

const getArtistById = (id) => {
  const artists = getAllArtists();
  let artist_details = {};
  artists.artists.forEach((artist) => {
    if (artist.artist_id === id) {
      artist_details = artist;
    }
  });
  return artist_details;
};

module.exports = {
  getArtistById,
};
