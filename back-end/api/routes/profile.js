const jwt = require('jsonwebtoken');

const verify = require('./verifyToken');

const {
  users: dbUsers,
  playlist: dbPlaylist,
  track: dbTrack,
  artists: dbArtists,
  rooms: dbRooms,
} = require('../db');

const PAGINATION = { LIMIT: 20, PAGE: 1 };

const playlistCreateOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        playlist_title: { type: 'string' },
        track_list: { type: 'string' },
      },
      required: ['playlist_title', 'track_list'],
    },
  },
};

const playlistAddOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        playlist_title: { type: 'string' },
        track_id: { type: 'string' },
      },
      required: ['playlist_title', 'track_id'],
    },
  },
};

const roomsCreateOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        room_name: { type: 'string' },
      },
      required: ['room_name'],
    },
  },
};

const roomsAddOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        room_name: { type: 'string' },
        admin_id: { type: 'string' },
      },
      required: ['room_name', 'admin_id'],
    },
  },
};

const roomsGetMoreOpts = {
  schema: {
    querystring: {
      order_by: { type: 'string' },
      limit: { type: 'string', default: PAGINATION.LIMIT },
      page: { type: 'string', default: PAGINATION.PAGE },
    },
  },
};

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const {password, ...user} = await dbUsers.getById(claims.id); // claims.id returns user id
    return res.send({ user, success: true });
  });

  fastify.post('/playlists', playlistCreateOpts, async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const { playlist_title: playlistTitle, track_list: trackList } = req.body;
    const newPlaylist = { userId: claims.id, playlistTitle, trackList };
    const playlist = await dbPlaylist.create(newPlaylist);
    return res.code(201).send({
      data: playlist,
      success: true,
    });
  });
  fastify.post('/playlists/add', playlistAddOpts, async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const { playlist_title: playlistTitle, track_id: trackId } = req.body;
    const playlist = await dbPlaylist.getByPlaylistTitle(playlistTitle);
    const updatedPlaylist = {
      playlistId: playlist.Playlist_ID,
      userId: claims.id,
      trackList: JSON.stringify(
        JSON.parse(playlist.Track_List).concat([trackId])
      ),
    };
    const result = await dbPlaylist.update(updatedPlaylist);
    return res.send({
      data: result,
      success: true,
    });
  });
  fastify.get('/playlists', async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const playlists = await dbPlaylist.getByUserId(claims.id);
    const response = [];
    for await (const playlist of playlists) {
      playlist.Tracks = await Promise.all(
        JSON.parse(playlist.Track_List).map((trackId) =>
          dbTrack.info.getById(trackId)
        )
      );
      for await (const [key, track] of Object.entries(playlist.tracks)) {
        playlist.Tracks[[Number(key)]].Artists = await Promise.all(
          JSON.parse(track.Artist_List).map((artistsId) =>
            dbArtists.getById(artistsId)
          )
        );
      }
      response.push(playlist);
    }
    return res.send({
      data: playlists,
      success: true,
    });
  });
  fastify.get('/playlists/:id', async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    let playlist = await dbPlaylist.getById(req.params.id, claims.id);
    playlist.Tracks = await Promise.all(
      JSON.parse(playlist.Track_List).map((trackId) =>
        dbTrack.info.getById(trackId)
      )
    );
    for await (const [key, track] of Object.entries(playlist.tracks)) {
      playlist.Tracks[[Number(key)]].Artists = await Promise.all(
        JSON.parse(track.Artist_List).map((artistsId) =>
          dbArtists.getById(artistsId)
        )
      );
    }
    return res.send({
      data: playlist,
      success: true,
    });
  });
  fastify.delete('/:id', async (req, res) => {
    await dbPlaylist.remove(req.params.id);
    return res.send({
      success: true,
    });
  });

  fastify.post('/rooms', roomsCreateOpts, async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const { room_name: roomName } = req.body;
    const newRoom = { adminId: claims.id, roomName };
    const room = await dbRooms.create(newRoom);
    res.code(201).send({
      data: room,
      success: true,
    });
  });
  fastify.post('/rooms/add', roomsAddOpts, async (req, res) => {
    verify.verifyToken(req.cookies.jwt, res);
    const { room_name: roomName, admin_id: adminId } = req.body;
    const room = await dbRooms.create({ roomName, adminId });
    res.send({
      data: room,
      success: true,
    });
  });
  fastify.get('/rooms', async (req, res) => {
    const result = await dbRooms.getAll();
    return res.send({
      data: result,
      success: true,
    });
  });
  fastify.get('/rooms/more', roomsGetMoreOpts, async (req, res) => {
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const result = await dbRooms.getAll(limit, page);
    return res.send({
      data: result,
      success: true,
    });
  });
  fastify.get('/rooms/:id', async (req, res) => {
    const room = await dbRooms.getById(req.params.id);
    return res.send({
      data: room,
      success: true,
    });
  });
  fastify.delete('/rooms/:id', async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    await dbRooms.remove(req.params.id, claims.id);
    return res.send({
      success: true,
    });
  });
}

module.exports = routes;
