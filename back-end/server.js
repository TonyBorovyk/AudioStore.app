// IMPORTS

const fastify = require('fastify')();

const { init } = require('./api/db');
const seeds = require('./api/db/seeds');
const {
  errors: { DATABASE },
} = require('./api/config');

const PORT = process.env.PORT || 3000;

fastify.register(require('fastify-cookie'));
fastify.register(require('fastify-cors'), {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:8080'],
});

// GLOBAL ERROR HANDLER
fastify.setErrorHandler(function (error, request, reply) {
  let status = 500;
  let response = { success: false };

  if (error.name === 'JsonWebTokenError') {
    status = 401;
    response.message = 'Unauthenticated';
  } else if (error.name === DATABASE) {
    status = 409;
    response.message = error.message;
  } else {
    response.error = error;
  }

  reply.status(status).send(response);
});
// ROUTES
fastify.register(require('./api/routes/songs'), { prefix: '/songs' });
fastify.register(require('./api/routes/albums'), { prefix: '/albums' });
fastify.register(require('./api/routes/artists'), { prefix: '/artists' });
fastify.register(require('./api/routes/profile'), { prefix: '/profile' });
fastify.register(require('./api/routes/search'), { prefix: '/search' });
fastify.register(require('./api/routes/auth'));

async function boot() {
  await init();

  await seeds();

  // LISTNER
  fastify.listen(PORT, (err /* , adress */) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server is listening on Port:${PORT}`);
  });
}

boot();

