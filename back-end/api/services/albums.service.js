/* eslint-disable camelcase */
const fs = require('fs');

const getAlbumsService = () => {
  const albums = fs.readFileSync('api/db/albums.json');
  return JSON.parse(albums).albums;
};

const getAlbumByIdService = (id) => {
  const albums = getAlbumsService();
  return albums.filter( album => album.album_id == id)[0];
};

module.exports = {
  getAlbumsService,
  getAlbumByIdService,
};
