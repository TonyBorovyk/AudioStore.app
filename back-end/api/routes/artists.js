const jwt = require('jsonwebtoken');

const verify = require('./verifyToken');

const { artists: dbArtists } = require('../db');

const createOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        artist_name: { type: 'string' },
      },
      required: ['artist_name'],
    },
  },
};

async function routes(fastify) {
  fastify.post('/', createOpts, async (req, res) => {
    const newArtist = { artistName: req.body.artist_name };
    const artist = await dbArtists.create(newArtist);
    return res.code(201).send({
      data: artist,
      success: true,
    });
  });
  fastify.get('/', async (req, res) => {
    const artists = await dbArtists.getAll();

    return res.send({
      data: artists,
      success: true,
    });
  });
  fastify.get('/:id', async (req, res) => {
    const artist = await dbArtists.getById(req.params.id);

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
