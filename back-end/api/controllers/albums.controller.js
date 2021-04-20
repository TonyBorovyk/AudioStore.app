const {getAlbumsService, getAlbumByIdService} = require('../services/albums.service');

const getAlbums = async (req, res, next) => {
    try {
        const albums = await getAlbumsService();

        return res.send({
            data: albums,
            success: true
        });
    } catch (error) {
        return res.send({
            error,
            success: false
        });
    }
};

const getAlbumById = async (req, res, next) => {
    try {
        const album = await getAlbumByIdService(req.params.id);

        return res.send({
            data: album || {},
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
    getAlbums,
    getAlbumById,
};
