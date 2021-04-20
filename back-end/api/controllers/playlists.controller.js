const {getPlaylistsService, getPlaylistByIdService} = require('../services/playlists.service');

const getPlaylists = async (req, res, next) => {
    try {
        const playlists = await getPlaylistsService();

        return res.send({
            data: playlists,
            success: true
        });
    } catch (error) {
        return res.send({
            error,
            success: false
        });
    }
};

const getPlaylistById = async (req, res, next) => {
    try {
        const playlist = await getPlaylistByIdService(req.params.id);

        return res.send({
            data: playlist || {},
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
    getPlaylists,
    getPlaylistById,
};
