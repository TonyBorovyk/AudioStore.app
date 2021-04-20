const {getSongById, getLastAddedSongs, getSongs} = require('../controllers/songs.controller')

async function routes(fastify, options) {
  fastify.get('/list', async (req, res) => {
    res.send(await getSongs(req, res))
  });
  fastify.get('/last-added', async (req, res, next) => {
    res.send(await getLastAddedSongs(req, res, next))
  });
  fastify.get('/:id', async (req, res) => {
    res.send(await getSongById(req, res))
  });
}

module.exports = routes;
