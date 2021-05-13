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
        track_id: { type: 'string' },
        artist_id: { type: 'string' },
      },
      required: ['track_id', 'artist_id'],
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

const getByAlbumIdOpts = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        album_id: { type: 'string' },
      },
      required: ['album_id'],
    },
  },
};

const getByArtistIdOpts = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        artist_id: { type: 'string' },
      },
      required: ['artist_id'],
    },
  },
};

async function getArtists(artistIds) {
  return await Promise.all(
    artistIds.map((artistsId) => dbArtists.getById(artistsId))
  );
}

async function getFullTracks(tracks) {
  const artistsList = await Promise.all(
    tracks.map((track) => getArtists(track.artist_list))
  );

  return tracks.map((track, index) => {
    track.artists = artistsList[index];
    return track;
  });
}

async function routes(fastify) {
  fastify.post('/', createOpts, async (req, res) => {
    const {
      album_name: albumName,
      artist_name: artistName,
      category_name: categoryName,
      ...track
    } = req.body;

    const album = await dbAlbums.getByAlbumName(albumName);
    const artist = await dbArtists.getByArtistName(artistName);
    const category = await dbTrack.category.getByCategoryName(categoryName);

    const newTrackInfo = {
      album_id: album.album_id,
      artist_id: artist.artist_id,
      category_id: category.category_id,
      track_name: track.track_name,
      lyrics: track.lyrics,
      duration: track.duration,
      cover: track.cover,
      release_year: track.release_year,
      track_url: track.track_url,
      artist_list: track.artist_list,
    };

    const trackInfo = await dbTrack.info.create(newTrackInfo);

    res.code(201).send({
      data: trackInfo,
      success: true,
    });
  });
  fastify.post('/add', addOpts, async (req) => {
    const { track_id: trackId, artist_id: artistId } = req.body;

    const track = await dbTrack.info.getById(trackId);
    const updatedTrack = {
      track_id: trackId,
      trackList: track.artist_list.concat([artistId]),
    };
    const result = await dbTrack.info.update(updatedTrack);

    return {
      data: result,
      success: true,
    };
  });
  fastify.get('/', getAllOpts, async (req) => {
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

    const response = await getFullTracks(tracks);

    return {
      data: {
        tracks: response,
        total,
        total_pages: totalPages,
      },
      success: true,
    };
  });
  fastify.get('/:id', async (req) => {
    const track = await dbTrack.info.getById(req.params.id);
    track.artists = await getArtists(track.artist_list);

    return {
      data: track,
      success: true,
    };
  });
  fastify.delete('/:id', async (req) => {
    await dbTrack.info.remove(req.params.id);
    return {
      success: true,
    };
  });
  fastify.get('/album', getByAlbumIdOpts, async (req) => {
    const { album_id: albumId } = req.query;
    const tracks = await dbTrack.info.getByAlbumId(albumId);

    return {
      data: tracks,
      success: true,
    };
  });
  fastify.get('/artist', getByArtistIdOpts, async (req) => {
    const { artist_id: artistId } = req.query;
    const tracks = await dbTrack.info.getByArtistId(artistId);

    return {
      data: tracks,
      success: true,
    };
  });
}

module.exports = routes;
