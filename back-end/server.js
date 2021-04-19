/* eslint-disable no-console */
const fastify = require('fastify')();

const PORT = process.env.PORT || 3000;

fastify.register(require('./api/routes/songs'), { prefix: '/songs' });
// fastify.register(require('./api/routes/albums'), { prefix: '/albums' });

fastify.listen(PORT, (err /* , adress */) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is listening on Port:${PORT}`);
});
