const {
  getArtistsService,
  getArtistByIdService,
} = require('../services/artists.service');

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    const artists = await getArtistsService();
    if (artists == undefined) {
      res.code(500).send({ success: false });
    }
    let data = { data: artists, success: true };
    res.send(data);
  });
  fastify.get('/:id', async (req, res) => {
    const artist = await getArtistByIdService(req.params.id);
    if (artists == undefined) {
      res.code(500).send({ success: false });
    }
    let data = { data: artist || {}, success: true };
    res.send(data);
  });
}

module.exports = routes;
