const { search: dbSearch } = require('../db');

async function routes(fastify) {
  fastify.post('/', async (req, res) => {
    const searchString = req.body ? req.body.search : '';

    const result = await dbSearch.global(searchString);

    res.send({
      data: result,
      success: true,
    });
  });
  fastify.post('/songs', async (req, res) => {
    const searchString = req.body ? req.body.search : '';

    const result = await dbSearch.global(searchString);

    res.send({
      data: result,
      success: true,
    });
  });
}

module.exports = routes;
