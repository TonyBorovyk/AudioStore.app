/* eslint-disable camelcase */
const fs = require('fs');

const getAllAlbums = () => {
  const data = fs.readFileSync('api/db/albums.json');
  const albums = JSON.parse(data);
  return albums;
};

const getAlbumById = (id) => {
  const albums = getAllAlbums();
  let album_details = {};
  albums.albums.forEach((album) => {
    if (album.album_id === id) {
      album_details = album;
    }
  });
  return album_details;
};

module.exports = {
  getAlbumById,
};
