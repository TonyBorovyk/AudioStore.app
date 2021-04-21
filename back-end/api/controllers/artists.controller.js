const {
  getArtistsService,
  getArtistByIdService,
} = require('../services/artists.service');

const getArtists = async (req, res) => {
  try {
    const artists = await getArtistsService();

    return {
      data: artists,
      success: true,
    }
  } catch (error) {
    return res.send({
      error,
      success: false,
    });
  }
};

const getArtistById = async (req, res) => {
  try {
    const artist = await getArtistByIdService(req.params.id);

    return res.send({
      data: artist || {},
      success: true,
    });
  } catch (error) {
    return {
      error,
      success: false,
    }
  }
};

module.exports = {
  getArtists,
  getArtistById,
};
