const {getArtistsService, getArtistByIdService} = require('../services/artists.service');

const getArtists = async (req, res, next) => {
    try {
        let artists = await getArtistsService();

        return res.send({
            data: artists,
            success: true
        });
    } catch (error) {
        return res.send({
            error,
            success: false
        });
    }
};

const getArtistById = async (req, res, next) => {
    try {
        let artist = await getArtistByIdService(req.params.id);

        return res.send({
            data: artist || {},
            success: true
        });
    } catch (error) {
        return res.send({
            error,
            success: false
        });
    }
};

module.exports = {
    getArtists,
    getArtistById,
};
