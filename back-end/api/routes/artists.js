const {
  getArtistsService,
  getArtistByIdService,
} = require('../services/artists.service');
const { artists: dbArtists } = require('../db');

const createOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        artistName: { type: 'string' },
      },
      required: ['artistName'],
    },
  },
};

async function routes(fastify) {
  fastify.post('/', createOpts, async (req, res) => {
    const newArtist = { artistName: req.body.artistName };
    const artist = await dbArtists.create(newArtist);
    return res.code(201).send({
      data: artist,
      success: true,
    });
  });
  fastify.get('/', async (req, res) => {
    const artists = await getArtistsService();

    return res.send({
      data: artists,
      success: true,
    });
  });
  fastify.get('/:id', async (req, res) => {
    const artist = await getArtistByIdService(req.params.id);

    return res.send({
      data: artist,
      success: true,
    });
  });
  fastify.delete('/:id', async (req, res) => {
    await dbArtists.remove(req.params.id);
    return res.send({
      success: true,
    });
  });
}

module.exports = routes;
