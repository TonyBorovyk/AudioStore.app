const verify = require('./verifyToken');

const { artists: dbArtists, users: dbUsers } = require('../db');

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
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const user = await dbUsers.getById(claims.id);
    if (user.role !== 'admin') {
      res.code(403).send({
        message: 'Forbidden',
        success: false,
      });
    }
    const newArtist = { artistName: req.body.artistName };
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
