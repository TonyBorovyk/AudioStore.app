const {getSongs} = require('../controllers/songs.controller');
const {getAlbums} = require('../controllers/albums.controller');
const {getArtists} = require('../controllers/artists.controller');

const searchData = async (req, res) => {
  try {
    const searchVal = req.body?.search || "";

    const searchHandler = ( entity, key ) => {
      return entity.filter( item => item[key].toLowerCase().trim().includes(searchVal.toLowerCase().trim()))
    };

    return {
      data: {
        songs: searchHandler((await getSongs(req, res)).data, "track_name"),
        albums: searchHandler((await getAlbums(req, res)).data,  "album_name"),
        artists: searchHandler((await getArtists(req, res)).data,  "artist_name")
      },
      success: true,
    }
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
