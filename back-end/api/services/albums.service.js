/* eslint-disable camelcase */
const fs = require('fs');

const getAlbumsService = () => {
  const data = fs.readFileSync('api/db/exampleReq.json');
  return JSON.parse(data).albums;
};

const getAlbumByIdService = (id) => {
  const albums = getAlbumsService();
  return albums.filter( album => album.album_id == id)[0];
};

module.exports = {
  getAlbumsService,
  getAlbumByIdService,
};
