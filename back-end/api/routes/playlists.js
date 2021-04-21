const {
  getPlaylists,
  getPlaylistById,
} = require('../controllers/playlists.controller');

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    res.send(await getPlaylists(req, res));
  });
  fastify.get('/:id', async (req, res) => {
    res.send(await getPlaylistById(req, res));
  });
}

module.exports = routes;
