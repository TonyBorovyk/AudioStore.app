const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  getPlaylistsByUserId,
  getPlaylistByIdService,
} = require('../services/playlists.service');
const { getSongByIdService } = require('../services/songs.service');

const getUserPlaylist = async (req, res) => {
  try {
    const cookie = req.cookies.jwt;
    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      return res.code(401).send({
        message: 'Unauthenticated',
        success: false,
      });
    }
    const playlists = await getPlaylistsByUserId(claims.id);
    return res.send({
      data: playlists,
      success: true,
    });
  } catch (error) {
    return res.code(401).send({
      message: 'Unauthenticated',
      success: false,
    });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const cookie = req.cookies.jwt;
    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      return res.code(401).send({
        message: 'Unauthenticated',
        success: false,
      });
    }
    let playlist = await getPlaylistByIdService(req.params.id);
    playlist = {
      ...playlist,
      tracks: playlist.tracks.map((songId) => getSongByIdService(songId)),
    };
    if (playlist.user_id !== claims.id) {
      return res.code(400).send({
        message: 'Not allowed',
        success: false,
      });
    }
    return res.send({
      data: playlist || {},
      success: true,
    });
  } catch (error) {
    return res.code(401).send({
      message: 'Unauthenticated',
      success: false,
    });
  }
};

module.exports = {
  getUserPlaylist,
  getPlaylistById,
};
