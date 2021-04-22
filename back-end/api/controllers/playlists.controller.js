const {
  getPlaylistsService,
  getPlaylistByIdService,
} = require('../services/playlists.service');

const getPlaylists = async (req, res) => {
  try {
    let playlists = await getPlaylistsService();
    playlists = playlists.map((playlist) => ({
      ...playlist,
      tracks: playlist.tracks.map((songId) => getSongByIdService(songId)),
    }));
    return res.send({
      data: playlists,
      success: true,
    });
  } catch (error) {
    return {
      error,
      success: false,
    };
  }
};

const getPlaylistById = async (req, res) => {
  try {
    let playlist = await getPlaylistByIdService(req.params.id);
    playlists = playlists.map((playlist) => ({
      ...playlist,
      tracks: playlist.tracks.map((songId) => getSongByIdService(songId)),
    }));
    return {
      data: playlist || {},
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
  getPlaylists,
  getPlaylistById,
};
