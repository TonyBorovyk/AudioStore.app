const {getPlaylistsService, getPlaylistByIdService} = require('../services/playlists.service');
const {getSongByIdService} = require('../services/songs.service');

const getPlaylists = async (req, res, next) => {
    try {
        let playlists = await getPlaylistsService();
        playlists = playlists.map( playlist => ({
            ...playlist,
            tracks: playlist.tracks.map( songId => getSongByIdService(songId)),
        }));

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
        let playlist = await getPlaylistByIdService(req.params.id);
        playlist = {
            ...playlist,
            tracks: playlist.tracks.map( songId => getSongByIdService(songId)),
        };

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
