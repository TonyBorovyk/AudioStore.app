const fs = require('fs');

const getArtistsService = () => {
  const data = fs.readFileSync('api/db/exampleReq.json');
  return JSON.parse(data).artists;
};

const getArtistByIdService = (id) => {
  const artists = getArtistsService();
  return artists.filter( artist => artist.artist_id == id)[0];
};

module.exports = {
  getArtistsService,
  getArtistByIdService,
};
