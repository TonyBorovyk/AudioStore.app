// const {
//   getAlbumsByOrder,
//   getAlbumById,
// } = require('../controllers/albumsController');

// async function routes(fastify, options) {
//   fastify.get('/', async (req, res) => {
//     res.send(getAlbumsByOrder( req.body && req.body.order_by || 'time_added'));
//   });

//   fastify.get('/:id', async (req, res) => {
//     res.send(getAlbumById(req.params.id));
//   });
// }

// module.exports = routes;
