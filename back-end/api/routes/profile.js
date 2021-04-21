const { getUser } = require('../controllers/profile.controller');
const {
  getUserPlaylist,
  getPlaylistById,
} = require('../controllers/playlists.controller');

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    try {
      res.send(await getUser(req, res));
    } catch (e) {
      res.send({ e });
    }
  });
  fastify.get('/playlists', async (req, res) => {
    try {
      res.send(await getUserPlaylist(req, res));
    } catch (e) {
      res.send({ e });
    }
  });
  fastify.get('/playlists/:id', async (req, res) => {
    try {
      res.send(await getPlaylistById(req, res));
    } catch (e) {
      res.send({ e });
    }
  });
  // fastify.post('/playlists/add', async (req, res) => {
  //   try {
  //     res.send(await getPlaylistById(req, res));
  //   } catch (e) {
  //     res.send({ e });
  //   }
  // });
}

module.exports = routes;
