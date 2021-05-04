/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
const { getSongs } = require('./songs.controller');
const { getAlbums } = require('./albums.controller');
const { getArtists } = require('./artists.controller');

const searchData = async (req, res) => {
  try {
    const searchVal = req.body?.search || '';

    const searchHandler = (entity, key) =>
      entity.filter((item) =>
        item[key].toLowerCase().trim().includes(searchVal.toLowerCase().trim())
      );

    return {
      data: {
        songs: searchHandler((await getSongs(req, res)).data, 'track_name'),
        albums: searchHandler((await getAlbums(req, res)).data, 'album_name'),
        artists: searchHandler(
          (await getArtists(req, res)).data,
          'artist_name'
        ),
      },
      success: true,
    };
  } catch (error) {
    return res.send({
      error,
      success: false,
    });
  }
};

module.exports = {
  searchData,
};
