// IMPORTS

const fastify = require('fastify')();

const PORT = process.env.PORT || 3000;

fastify.register(require('fastify-cookie'));
fastify.register(require('fastify-cors'), {
  credentials: true,
});

// ROUTES
fastify.register(require('./api/routes/songs'), { prefix: '/songs' });
fastify.register(require('./api/routes/albums'), { prefix: '/albums' });
fastify.register(require('./api/routes/artists'), { prefix: '/artists' });
fastify.register(require('./api/routes/playlists'), { prefix: '/playlists' });
fastify.register(require('./api/routes/profile'), { prefix: '/profile' });
fastify.register(require('./api/routes/search'), { prefix: '/search' });
fastify.register(require('./api/routes/auth'));

// LISTNER
fastify.listen(PORT, (err /* , adress */) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is listening on Port:${PORT}`);
});
