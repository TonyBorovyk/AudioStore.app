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
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://:::3000',
    'https://audiostore-app.herokuapp.com/',
    `http://localhost:${PORT}`,
    `http://:::${PORT}`,
  ],
});

// GLOBAL ERROR HANDLER
fastify.setErrorHandler(function (error, request, reply) {
  let status = 500;
  let response = { success: false };

  console.error(error.message || error);

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
fastify.register(
  (fastifyInstance, opts, done) => {
    fastifyInstance.register(require('./api/routes/songs'), {
      prefix: '/songs',
    });
    fastifyInstance.register(require('./api/routes/albums'), {
      prefix: '/albums',
    });
    fastifyInstance.register(require('./api/routes/artists'), {
      prefix: '/artists',
    });
    fastifyInstance.register(require('./api/routes/profile'), {
      prefix: '/profile',
    });
    fastifyInstance.register(require('./api/routes/search'), {
      prefix: '/search',
    });
    fastifyInstance.register(require('./api/routes/auth'));
    done();
  },
  { prefix: '/api' }
);

async function boot() {
  await init();

  await seeds();

  // LISTNER
  fastify.listen(PORT, '::', (err /* , adress */) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
}

boot();
