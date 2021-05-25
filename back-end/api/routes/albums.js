const { albums: dbAlbums, artists: dbArtists } = require('../db');

const {
  transform: { getArtists, getFullAlbums },
} = require('../services');

const PAGINATION = { LIMIT: 20, PAGE: 1 };

const createOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        album_name: { type: 'string' },
        artist_name: { type: 'string' },
        cover: { type: 'string' },
        artist_list: { type: 'array' },
      },
      required: ['album_name', 'artist_name', 'cover', 'artist_list'],
    },
  },
};

const addOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        album_id: { type: 'string' },
        artist_id: { type: 'string' },
      },
      required: ['album_id', 'artist_id'],
    },
  },
};

const getMoreOpts = {
  schema: {
    querystring: {
      limit: { type: 'string', default: PAGINATION.LIMIT },
      page: { type: 'string', default: PAGINATION.PAGE },
    },
  },
};

async function routes(fastify) {
  fastify.post('/', createOpts, async (req, res) => {
    const { artist_name: artistName, ...album } = req.body;
    const newAlbum = {
      album_name: album.album_name,
      cover: album.cover,
      artist_list: album.artist_list,
    };

    const { artist_id: artistId } = await dbArtists.getByArtistName(artistName);
    newAlbum.artist_id = artistId;

    const response = await dbAlbums.create(newAlbum);
    res.code(201).send({
      data: response,
      success: true,
    });
  });
  fastify.post('/add', addOpts, async (req) => {
    const { album_id: albumId, artist_id: artistId } = req.body;

    const album = await dbAlbums.getById(albumId);
    const updatedAlbum = {
      album_id: albumId,
      artist_list: album.concat(artistId),
    };
    const result = await dbAlbums.update(updatedAlbum);
    ({
      data: result,
      success: true,
    });
  });
  fastify.get('/', async () => {
    const albums = await dbAlbums.getAll();

    const response = await getFullAlbums(albums);

    return {
      data: response,
      success: true,
    };
  });
  fastify.get('/more', getMoreOpts, async (req) => {
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);

    const { albums, total, totalPages } = await dbAlbums.getMore(limit, page);

    const response = await getFullAlbums(albums);

    response.total = total;
    response.total_ages = totalPages;

    return {
      data: response,
      success: true,
    };
  });
  fastify.get('/:id', async (req) => {
    let album = await dbAlbums.getById(req.params.id);
    if (album) {
      album.artists = await getArtists(album.artist_list);
    }
    return {
      data: album,
      success: true,
    };
  });
  fastify.delete('/:id', async (req) => {
    await dbAlbums.remove(req.params.id);
    return {
      success: true,
    };
  });
}

module.exports = routes;
