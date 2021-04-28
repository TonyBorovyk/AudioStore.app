const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserById } = require('../services/profile.service');

const getUser = async (req, res) => {
  const cookie = req.cookies.jwt;
  if (cookie == undefined) {
    res.code(401).send({ message: 'Unauthenticated', success: false });
  }
  const claims = jwt.verify(cookie, process.env.JWT_SECRET);
  if (!claims) {
    res.code(401).send({
      message: 'Unauthenticated',
      success: false,
    });
  }
  const user = await getUserById(claims.id); // claims.id returns user id
  res.send({ user, success: true });
};

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    const cookie = req.cookies.jwt;
    if (cookie == undefined) {
      res.code(401).send({ message: 'Unauthenticated', success: false });
    }
    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      res.code(401).send({
        message: 'Unauthenticated',
        success: false,
      });
    }
    const user = await getUserById(claims.id); // claims.id returns user id
    res.send({ user, success: true });
  });
}

module.exports = routes;
