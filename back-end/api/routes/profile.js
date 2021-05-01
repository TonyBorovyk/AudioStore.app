const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserById } = require('../services/profile.service');

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    const cookie = req.cookies.jwt;
    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      res.code(401).send({
        message: 'Unauthenticated',
        success: false,
      });
    }
  });
  fastify.get('/playlists', async (req, res) => {
    const user = await getUserById(claims.id);
    if (user == undefined) {
      res.code(401).send({ user, success: false });
    } // claims.id returns user id
    let data = { data: user || {}, success: true };
    res.send(data);
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
