const { getSongs } = require('../controllers/songsController');

async function routes(fastify /* , options */) {
  fastify.get('/', (req, res, next) => {
    getSongs(req, res, next);
  });

  // fastify.get('/:id', async (req, res) => {
  //   res.send(getSongById(req.params.id));
  // });
}

module.exports = routes;
