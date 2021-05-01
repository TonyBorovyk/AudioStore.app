const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/auth.controller');

async function routes(fastify) {
  fastify.post('/login', async (req, res) => {
    try {
      res.send(await loginUser(req, res));
    } catch (e) {
      res.send(e);
    }
  });
  fastify.post('/signup', async (req, res) => {
    try {
      res.send(await registerUser(req, res));
    } catch (e) {
      res.send(e);
    }
  });
  fastify.post('/logout', async (req, res) => {
    try {
      res.send(await logoutUser(req, res));
    } catch (e) {
      res.send(e);
    }
  });
}

module.exports = routes;
