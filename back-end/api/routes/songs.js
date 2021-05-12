const {
  albums: dbAlbums,
  artists: dbArtists,
  track: dbTrack,
  users: dbUsers,
} = require('../db');

const verify = require('./verifyToken');

const PAGINATION = { LIMIT: 20, PAGE: 1 };

const createOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        album_name: { type: 'string' },
        artist_name: { type: 'string' },
        category_name: { type: 'string' },
        track_name: { type: 'string' },
        lyrics: { type: 'string' },
        duration: { type: 'string' },
        cover: { type: 'string' },
        release_year: { type: 'string' },
        track_URL: { type: 'string' },
        artist_list: { type: 'string' },
      },
      required: [
        'album_name',
        'artist_name',
        'category_name',
        'track_name',
        'lyrics',
        'duration',
        'cover',
        'release_year',
        'track_URL',
        'artist_list',
      ],
    },
  },
};

const addOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        track_name: { type: 'string' },
        artist_id: { type: 'string' },
      },
      required: ['track_name', 'artist_id'],
    },
  },
};

const getAllOrderByOpts = {
  schema: {
    querystring: {
      order_by: { type: 'string' },
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
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const user = await dbUsers.getById(claims.id);
    if (user.role !== 'admin') {
      res.code(403).send({
        message: 'Forbidden',
        success: false,
      });
    }
    const {
      album_name: albumName,
      artist_name: artistName,
      category_name: categoryName,
      track_name: trackName,
      lyrics,
      duration,
      cover,
      release_year: releaseYear,
      track_URL: trackURL,
      artist_list: artistList,
    } = req.body;
    const { Album_ID: albumId } = await dbAlbums.getByAlbumName(albumName);
    const { Artist_ID: artistId } = await dbArtists.getByArtistName(artistName);
    const {
      Category_ID: categoryId,
    } = await dbTrack.category.getByCategoryName(categoryName);
    const newTrackInfo = {
      albumId,
      artistId,
      categoryId,
      trackName,
      lyrics,
      duration,
      cover,
      releaseYear,
      trackURL,
      artistList,
    };
    const trackInfo = await dbTrack.info.create(newTrackInfo);
    res.send({
      data: trackInfo,
      success: true,
    });
  });
  fastify.post('/add', addOpts, async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const user = await dbUsers.getById(claims.id);
    if (user.role !== 'admin') {
      res.code(403).send({
        message: 'Forbidden',
        success: false,
      });
    }
    const { track_name: trackName, artist_id: artistId } = req.body;

    const track = await dbTrack.info.getByTrackName(trackName);
    const updatedTrack = {
      trackId: track.Track_ID,
      trackList: JSON.stringify(
        JSON.parse(track.Artist_List).concat([artistId])
      ),
    };
    const result = await dbTrack.info.update(updatedTrack);

    res.send({
      data: result,
      success: true,
    });
  });
  fastify.get('/', getAllOrderByOpts, async (req, res) => {
    const orderBy = req.query.order_by || 'Time_added';
    const tracks = await dbTrack.info.getAllOrderBy(orderBy);
    const response = [];
    for await (const track of tracks) {
      track.Artists = await Promise.all(
        JSON.parse(track.Artist_List).map((artistsId) =>
          dbArtists.getById(artistsId)
        )
      );
      response.push(track);
    }

    return res.send({
      data: response,
      success: true,
    });
  });
  fastify.get('/more', getMoreOpts, async (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const { tracks, total, totalPages } = await dbTrack.info.getAll(
      orderBy,
      sortDesk,
      limit,
      page
    );
    const response = { tracks: [], total, total_pages: totalPages };
    for await (const track of tracks) {
      track.Artists = await Promise.all(
        JSON.parse(track.Artist_List).map((artistsId) =>
          dbArtists.getById(artistsId)
        )
      );
      response.tracks.push(track);
    }

    return res.send({
      data: response,
      success: true,
    });
  });
  fastify.get('/:id', async (req, res) => {
    let track = await dbTrack.info.getById(req.params.id);
    track.Artists = await Promise.all(
      JSON.parse(track.Artist_List).map((artistsId) =>
        dbArtists.getById(artistsId)
      )
    );
    return res.send({
      data: track,
      success: true,
    });
  });
  fastify.delete('/:id', async (req, res) => {
    await dbTrack.info.remove(req.params.id);
    return res.send({
      success: true,
    });
  });
}

module.exports = routes;
