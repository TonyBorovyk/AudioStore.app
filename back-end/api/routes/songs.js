const {
  albums: dbAlbums,
  artists: dbArtists,
  track: dbTrack,
} = require('../db');

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
        track_url: { type: 'string' },
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
        'track_url',
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

const getAllOpts = {
  schema: {
    querystring: {
      order_by: { type: 'string', default: 'time_added' },
      sort_desk: { type: 'string', default: 'true' },
      limit: { type: 'string', default: PAGINATION.LIMIT },
      page: { type: 'string', default: PAGINATION.PAGE },
    },
  },
};

async function routes(fastify) {
  fastify.post('/', createOpts, async (req, res) => {
    const {
      album_name: albumName,
      artist_name: artistName,
      category_name: categoryName,
      track_name: trackName,
      lyrics,
      duration,
      cover,
      release_year: releaseYear,
      track_url: trackURL,
      artist_list: artistList,
    } = req.body;
    const { album_id: albumId } = await dbAlbums.getByAlbumName(albumName);
    const { artist_id: artistId } = await dbArtists.getByArtistName(artistName);
    const {
      category_id: categoryId,
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
    const { track_name: trackName, artist_id: artistId } = req.body;

    const track = await dbTrack.info.getByTrackName(trackName);
    const updatedTrack = {
      trackId: track.track_id,
      trackList: JSON.stringify(
        JSON.parse(track.artist_list).concat([artistId])
      ),
    };
    const result = await dbTrack.info.update(updatedTrack);

    res.send({
      data: result,
      success: true,
    });
  });
  fastify.get('/', getAllOpts, async (req, res) => {
    const orderBy = req.query.order_by;
    const sortDesk = req.query.sort_desk === 'true';
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
      track.artists = await Promise.all(
        JSON.parse(track.artist_list).map((artistsId) =>
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
    track.artists = await Promise.all(
      JSON.parse(track.artist_list).map((artistsId) =>
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
