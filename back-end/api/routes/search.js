const { searchData } = require('../controllers/search.controller');

async function routes(fastify) {
    fastify.post('/', async (req, res) => {
        try {
            res.send(await searchData(req, res));
        } catch (e) {
            res.send({ e });
        }
    });
}

module.exports = routes;