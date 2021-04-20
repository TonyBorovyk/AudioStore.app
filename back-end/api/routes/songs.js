const {getSongById, getSongs} = require('../controllers/songs.controller')

async function routes(fastify, options) {
  fastify.post('/', async (req, res) => {
    res.send(await getSongs(req, res))
  });
  fastify.get('/:id', async (req, res) => {
    res.send(await getSongById(req, res))
  });
}

module.exports = routes;
