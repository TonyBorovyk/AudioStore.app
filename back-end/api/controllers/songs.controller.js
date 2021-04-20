const {getAllSongsService, getLastAddedSongsService, getSongByIdService} = require('../services/songs.service');

const getSongs = async (req, res, next) => {
    try {
        const songs = await getAllSongsService();

        return res.send({
            data: songs,
            success: true
        });
    } catch (error) {
        return res.send({
            error,
            success: false
        });
    }
};

const getSongById = async (req, res, next) => {
    try {
        const song = await getSongByIdService(req.params.id);

        return res.send({
            data: song || {},
            success: true
        });
    } catch (error) {
        return res.send({
            error,
            success: false
        });
    }
};

const getLastAddedSongs = async (req, res, next) => {
    try {
        const songs = await getLastAddedSongsService(req.params.id);

        return res.send({
            data: songs,
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
    getSongs,
    getSongById,
    getLastAddedSongs
};
