const { getUser } = require('../controllers/profile.controller');

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    try {
      res.send(await getUser(req, res));
    } catch (e) {
      res.send({ e });
    }
  });
}

module.exports = routes;
