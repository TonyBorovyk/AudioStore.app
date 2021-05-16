const { search: dbSearch } = require('../db');
const {
  transform: { getFullAlbums, getFullPlaylists, getFullTracks },
} = require('../services');

async function routes(fastify) {
  fastify.post('/', async (req) => {
    const searchString = req.body ? req.body.search : '';

    const result = await dbSearch.global(searchString);

    result.albums = await getFullAlbums(result.albums);
    result.playlists = await getFullPlaylists(result.playlists);
    result.tracks = await getFullTracks(result.tracks);

    return {
      data: result,
      success: true,
    };
  });
  fastify.post('/songs', async (req) => {
    const searchString = req.body ? req.body.search : '';

    const tracks = await dbSearch.songs(searchString);

    const result = await getFullTracks(tracks);

    return {
      data: result,
      success: true,
    };
  });
}

module.exports = routes;
