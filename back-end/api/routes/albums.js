const { albums: dbAlbums, artists: dbArtists } = require('../db');

const PAGINATION = { LIMIT: 20, PAGE: 1 };

const createOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        album_name: { type: 'string' },
        artist_name: { type: 'string' },
        cover: { type: 'string' },
        artist_list: { type: 'string' },
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
        album_name: { type: 'string' },
        artist_id: { type: 'string' },
      },
      required: ['album_name', 'artist_id'],
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
//
async function routes(fastify) {
  fastify.post('/', createOpts, async (req, res) => {
    const {
      album_name: albumName,
      artist_name: artistName,
      cover,
      artist_id: artistList,
    } = req.body;
    const { Artist_ID: artistId } = await dbArtists.getByArtistName(artistName);
    const newAlbum = { albumName, artistId, cover, artistList };
    const album = await dbAlbums.create(newAlbum);
    res.code(201).send({
      data: album,
      success: true,
    });
  });
  fastify.post('/add', addOpts, async (req, res) => {
    const { album_name: albumName, artist_id: artistId } = req.body;

    const album = await dbAlbums.getByAlbumName(albumName);
    const updatedAlbum = {
      albumId: album.Album_ID,
      artistList: JSON.stringify(
        JSON.parse(album.Artist_List).concat([artistId])
      ),
    };
    const result = await dbAlbums.update(updatedAlbum);
    res.send({
      data: result,
      success: true,
    });
  });
  fastify.get('/', async (req, res) => {
    const albums = await dbAlbums.getAll();
    const response = [];
    for await (const album of albums) {
      album.Artists = await Promise.all(
        JSON.parse(album.Artist_List).map((artistsId) =>
          dbArtists.getById(artistsId)
        )
      );
      response.push(album);
    }
    return res.send({
      data: albums,
      success: true,
    });
  });
  fastify.get('/more', getMoreOpts, async (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const { albums, total, totalPages } = await dbAlbums.getMore(limit, page);
    const response = { albums: [], total, totalPages };
    for await (const album of albums) {
      album.Artists = await Promise.all(
        JSON.parse(album.Artist_List).map((artistsId) =>
          dbArtists.getById(artistsId)
        )
      );
      response.albums.push(album);
    }
    return res.send({
      data: response,
      success: true,
    });
  });
  fastify.get('/:id', async (req, res) => {
    let album = await dbAlbums.getById(req.params.id);
    if (album) {
      album = {
        ...album,
        Artists: await Promise.all(
          JSON.parse(album.Artist_List).map((artistsId) =>
            dbArtists.getById(artistsId)
          )
        ),
      };
    }
    return res.send({
      data: album,
      success: true,
    });
  });
  fastify.delete('/:id', async (req, res) => {
    await dbAlbums.remove(req.params.id);
    return res.send({
      success: true,
    });
  });
}

module.exports = routes;
