const { getAlbums, getAlbumById } = require('../controllers/albums.controller');

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    res.send(await getAlbums(req, res));
  });
  fastify.get('/:id', async (req, res) => {
    res.send(await getAlbumById(req, res));
  });
}

module.exports = routes;
