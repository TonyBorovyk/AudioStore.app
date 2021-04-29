const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  getPlaylistsByUserId,
  getPlaylistByIdService,
} = require('../services/playlists.service');
const { getSongByIdService } = require('../services/songs.service');
const { getArtistByIdService } = require('../services/artists.service');




async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    const cookie = req.cookies.jwt;
    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      return res.code(401).send({
        message: 'Unauthenticated',
        success: false,
      });
    }
    const playlists = await getPlaylistsByUserId(claims.id);
    if (playlist == undefined) {
      res.code(401).send({ message: 'Unauthenticated', success: false });
    }
    let data = { data: playlists, success: true };
    res.send(data);
  });
  fastify.get('/:id', async (req, res) => {
    const cookie = req.cookies.jwt;
    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      return res.code(401).send({
        message: 'Unauthenticated',
        success: false,
      });
    }
    let playlist = await getPlaylistByIdService(req.params.id);
    if (playlist == undefined) {
      res.code(500).send({ success: false });
    playlist = {
      ...playlist,
      tracks: playlist.tracks.map((songId) => {
        let song = getSongByIdService(songId);
        if (song == undefined) {
          res.code(500).send({ success: false });
        }
        song = {
          ...song,
          artists: song.artists.map((artistId) =>
            getArtistByIdService(artistId)
          ),
        };
        let data = { data: song, success: true };
        res.send(data);
      }),
    };
    if (playlist.user_id !== claims.id) {
      return res.code(400).send({
        message: 'Not allowed',
        success: false,
      });
    }
    let data = { data: playlist || {},success: true, };
        res.send(data);
  } 
  
  });
}

module.exports = routes;
