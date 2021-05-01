const {
  getAlbumsService,
  getAlbumByIdService,
} = require('../services/albums.service');
const { getArtistByIdService } = require('../services/artists.service');
const { getSongByIdService } = require('../services/songs.service');

const getAlbums = async (req, res) => {
  try {
    let albums = await getAlbumsService();
    albums = albums.map((album) => ({
      ...album,
      artists: album.artists.map((artistsId) =>
        getArtistByIdService(artistsId)
      ),
      songs_list: album.songs_list.map((songId) => getSongByIdService(songId)),
    }));

    return {
      data: albums,
      success: true,
    };
  } catch (error) {
    return res.send({
      error,
      success: false,
    });
  }
};

const getAlbumById = async (req, res) => {
  try {
    let album = await getAlbumByIdService(req.params.id);
    album = {
      ...album,
      artists: album.artists.map((artistsId) =>
        getArtistByIdService(artistsId)
      ),
      songs_list: album.songs_list.map((songId) => getSongByIdService(songId)),
    };

    return {
      data: album || {},
      success: true,
    };
  } catch (error) {
    return res.send({
      error,
      success: false,
    });
  }
};

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
    res.send(await getAlbumById(req, res));
  });
}

module.exports = routes;
