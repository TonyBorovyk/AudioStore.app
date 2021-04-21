const {
  getSongByIdService,
  getAllSongsByOrdersService,
} = require('../services/songs.service');
const { getArtistByIdService } = require('../services/artists.service');
const { getAlbumByIdService } = require('../services/albums.service');

const getSongs = async (req, res) => {
  try {
    const orders = Object.keys(req.query).length ? req.query : 'last_added';

    let songs = await getAllSongsByOrdersService(orders);

    songs = songs.map((song) => ({
      ...song,
      artists: song.artists.map((artistsId) => getArtistByIdService(artistsId)),
      album: getAlbumByIdService(song.album),
    }));

    return {
      data: songs,
      success: true,
    }
  } catch (error) {
    return res.send({
      error,
      success: false,
    });
  }
};

const getSongById = async (req, res) => {
  try {
    let song = await getSongByIdService(req.params.id);
    song = {
      ...song,
      artists: song.artists.map((artistsId) => getArtistByIdService(artistsId)),
      album: getAlbumByIdService(song.album),
    };

    return {
      data: song || {},
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
  getSongs,
  getSongById,
};
