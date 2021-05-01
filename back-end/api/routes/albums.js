const {
  getAlbumsService,
  getAlbumByIdService,
} = require('../services/albums.service');
const { getArtistByIdService } = require('../services/artists.service');
const { getSongByIdService } = require('../services/songs.service');

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    let albums = await getAlbumsService();
    if (albums == undefined) {
      res.code(500).send({ success: false });
    }
    albums = albums.map((album) => ({
      ...album,
      artists: album.artists.map((artistsId) =>
        getArtistByIdService(artistsId)
      ),
      songs_list: album.songs_list.map((songId) => getSongByIdService(songId)),
    }));

    let data = { data: albums, success: true };
    res.send(data);
  });
  fastify.get('/:id', async (req, res) => {
    let album = await getAlbumByIdService(req.params.id);
    if (albums == undefined) {
      res.code(500).send({ success: false });
    }
    album = {
      ...album,
      artists: album.artists.map((artistsId) =>
        getArtistByIdService(artistsId)
      ),
      songs_list: album.songs_list.map((songId) => getSongByIdService(songId)),
    };
    let data = { data: albums, success: true };
    res.send(data);
  });
}

module.exports = routes;
