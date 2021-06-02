const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { users: dbUsers } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;

const singUpOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['first_name', 'last_name', 'username', 'email', 'password'],
    },
  },
};

const sendResponse = (res, status, success, message) => {
  return res.code(status).send({ success, message });
};

async function routes(fastify) {
  fastify.post('/login', async (req, res) => {
    const user = await dbUsers.getByEmail(req.body.email);

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return sendResponse(res, 400, false, 'Password is incorrect');
    }

    const token = jwt.sign({ id: user.user_id }, `${process.env.JWT_SECRET}`);

    res.setCookie('jwt', token, {
      httpOnly: true,
      maxAge: 12 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });

    return sendResponse(res, 200, true);
  });
  fastify.post('/signup', singUpOpts, async (req, res) => {
    const isUsernameExist = await dbUsers.usernameExists(req.body.username);
    if (isUsernameExist) {
      return sendResponse(res, 400, false, 'username exist');
    }
    const isEmailExist = await dbUsers.emailExists(req.body.email);
    if (isEmailExist) {
      return sendResponse(res, 400, false, 'email exist');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    await dbUsers.create(newUser);

    return sendResponse(res, 201, true);
  });
  fastify.post('/logout', async (req, res) => {
    res.setCookie('jwt', '', { maxAge: 0 });
    return sendResponse(res, 201, true);
  });
}

module.exports = routes;
