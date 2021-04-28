require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  setUser,
  emailExist,
  usernameExist,
  getUserByEmail,
} = require('../services/auth.service');

async function routes(fastify) {
  fastify.post('/login', async (req, res) => {
    res.setCookie('jwt', '', { maxAge: 0 });
    if (maxAge == undefined) {
      res.code(201).send({
        success: true,
      });
    }
    let data = { success: false };
    res.send(data);
  });
  fastify.post('/signup', async (req, res) => {
    if (usernameExist(req.body.username)) {
      return res.code(400).send({
        success: false,
        message: 'username exist',
      });
    }
    if (emailExist(req.body.email)) {
      return res.code(400).send({
        success: false,
        message: 'email exist',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      first_name: req.body.first_name,
      user_id: req.body.username,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      last_name: req.body.last_name,
    };
    setUser(user);
    if (user == undefined) {
      res.code(201).send({
        success: true,
      });
    }
    let data = { success: false };
    res.send(data);
  });
  fastify.post('/logout', async (req, res) => {
    const user = await getUserByEmail(req.body.email);
    if (!user) {
      return res.code(404).send({
        success: false,
        message: 'User not found',
      });
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.code(400).send({
        success: false,
        message: 'Password is incorrect',
      });
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET);

    res.setCookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 1000,
    });
  });
  let data = { success: false };
  res.send(data);
}

module.exports = routes;
