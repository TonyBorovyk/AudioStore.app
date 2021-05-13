const { search: dbSearch, artists: dbArtists } = require('../db');

async function getArtists(artistIds) {
  return await Promise.all(
    artistIds.map((artistsId) => dbArtists.getById(artistsId))
  );
}

async function routes(fastify) {
  fastify.post('/', async (req) => {
    const searchString = req.body ? req.body.search : '';

    const result = await dbSearch.global(searchString);

    return {
      data: result,
      success: true,
    };
  });
  fastify.post('/songs', async (req) => {
    const searchString = req.body ? req.body.search : '';

    let result = await dbSearch.songs(searchString);
    result.forEach(async (track) => {
      track.artists = [];
      track.artists = await getArtists(JSON.parse(track.artist_list));
    });

    return {
      data: result,
      success: true,
    };
  });
}

module.exports = routes;
