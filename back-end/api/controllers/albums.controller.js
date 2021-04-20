const {getAlbumsService, getAlbumByIdService} = require('../services/albums.service');
const {getArtistByIdService} = require('../services/artists.service');
const {getSongByIdService} = require('../services/songs.service');

const getAlbums = async (req, res, next) => {
    try {
        let albums = await getAlbumsService();
        albums = albums.map( album => ({
            ...album,
            artists: album.artists.map( artistsId => getArtistByIdService(artistsId)),
            songs_list: album.songs_list.map(songId => getSongByIdService(songId)) ,
        }));

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
        let album = await getAlbumByIdService(req.params.id);
        album = {
            ...album,
            artists: album.artists.map( artistsId => getArtistByIdService(artistsId)),
            songs_list: album.songs_list.map(songId => getSongByIdService(songId)) ,
        }

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
