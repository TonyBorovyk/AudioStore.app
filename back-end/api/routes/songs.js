const {
  getSongByIdService,
  getAllSongsByOrdersService,
} = require('../services/songs.service');
const { getArtistByIdService } = require('../services/artists.service');
const { getAlbumByIdService } = require('../services/albums.service');

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    const orders = Object.keys(req.query).length ? req.query : 'last_added';
    if (orders == undefined) {
      res.code(500).send({ success: false });
    }
    let songs = await getAllSongsByOrdersService(orders);
    songs = songs.map((song) => ({
      ...song,
      artists: song.artists.map((artistsId) => getArtistByIdService(artistsId)),
      album: getAlbumByIdService(song.album),
    }));

    let data = { data: orders || {}, success: true };
    res.send(data);
  });
  fastify.get('/:id', async (req, res) => {
    let song = await getSongByIdService(req.params.id);
    if (song == undefined) {
      res.code(500).send({ success: false });
    }
    song = {
      ...song,
      artists: song.artists.map((artistsId) => getArtistByIdService(artistsId)),
      album: getAlbumByIdService(song.album),
    };
    let data = { data: artists || {}, success: true };
    res.send(data);
  });
}

module.exports = routes;
