const {getArtists, getArtistById} = require('../controllers/artists.controller');

async function routes(fastify, options) {
  fastify.get('/', async (req, res) => {
    res.send(await getArtists(req, res))
  });
  fastify.get('/:id', async (req, res) => {
    res.send(await getArtistById(req, res))
  });
}

module.exports = routes;
