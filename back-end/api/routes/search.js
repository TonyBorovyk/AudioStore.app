const { search: dbSearch } = require('../db');

const verify = require('./verifyToken');

async function routes(fastify) {
  fastify.post('/', async (req, res) => {
    verify.verifyToken(req.cookies.jwt, res);
    const searchString = req.body ? req.body.search : '';

    const result = await dbSearch.global(searchString);

    res.send({
      data: result,
      success: true,
    });
  });
  fastify.post('/songs', async (req, res) => {
    verify.verifyToken(req.cookies.jwt, res);
    const searchString = req.body ? req.body.search : '';

    const result = await dbSearch.global(searchString);

    res.send({
      data: result,
      success: true,
    });
  });
}

module.exports = routes;
