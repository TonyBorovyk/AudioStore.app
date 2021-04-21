const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserById } = require('../services/profile.service');

const getUser = async (req, res) => {
  try {
    const cookie = req.cookies.jwt;
    const claims = jwt.verify(cookie, process.env.JWT_SECRET);
    if (!claims) {
      return res.code(401).send({
        message: 'Unauthenticated',
        success: false,
      });
    }
    const user = await getUserById(claims.id); // claims.id returns user id
    return res.send({ user, success: true });
  } catch (e) {
    return res.code(401).send({
      message: 'Unauthenticated',
      success: false,
    });
  }
};

module.exports = {
  getUser,
};
