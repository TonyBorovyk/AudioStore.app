const { artists: dbArtists } = require('../db');

const PAGINATION = {
  LIMIT: 20,
  PAGE: 1,
};

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

const getMoreOpts = {
  schema: {
    querystring: {
      limit: { type: 'string', default: PAGINATION.LIMIT },
      page: { type: 'string', default: PAGINATION.PAGE },
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
  fastify.get('/', async () => {
    const artists = await dbArtists.getAll();

    return {
      data: artists,
      success: true,
    };
  });
  fastify.get('/more', getMoreOpts, async (req) => {
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);

    const { artists, total, totalPages } = await dbArtists.getMore(limit, page);

    return {
      data: {
        artists: artists,
        total,
        total_pages: totalPages,
      },
      success: true,
    };
  });
  fastify.get('/:id', async (req) => {
    const artist = await dbArtists.getById(req.params.id);

    return {
      data: artist,
      success: true,
    };
  });
  fastify.delete('/:id', async (req) => {
    await dbArtists.remove(req.params.id);
    return {
      success: true,
    };
  });
}

module.exports = routes;
