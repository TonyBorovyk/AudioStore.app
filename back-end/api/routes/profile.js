const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const {
  users: dbUsers,
  playlist: dbPlaylist,
  rooms: dbRooms,
} = require('../db');
const {
  transform: { getTracks },
} = require('../services');

const PAGINATION = { LIMIT: 20, PAGE: 1 };

const playlistCreateOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        playlist_title: { type: 'string' },
        track_list: { type: 'array' },
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
        playlist_id: { type: 'string' },
        track_id: { type: 'string' },
      },
      required: ['playlist_id', 'track_id'],
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
    // eslint-disable-next-line no-unused-vars
    const { password, ...user } = await dbUsers.getById(claims.id); // claims.id returns user id

    return { user, success: true };
  });

  fastify.post('/playlists', playlistCreateOpts, async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const newPlaylist = {
      user_id: claims.id,
      playlist_title: req.body.playlist_title,
      track_list: req.body.track_list,
    };
    const response = await dbPlaylist.create(newPlaylist);
    return res.code(201).send({
      data: response,
      success: true,
    });
  });
  fastify.post('/playlists/add', playlistAddOpts, async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const { playlist_id: playlistId, track_id: trackId } = req.body;
    const playlist = await dbPlaylist.getById(playlistId);

    const updatedPlaylist = {
      playlist_id: playlistId,
      user_id: claims.id,
      track_list: playlist.track_list.concat([trackId]),
    };

    const result = await dbPlaylist.update(updatedPlaylist);
    return {
      data: result,
      success: true,
    };
  });

  fastify.delete('/playlists/delete', playlistAddOpts, async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const { playlist_id: playlistId, track_id: trackId } = req.body;
    const playlist = await dbPlaylist.getById(playlistId);

    const updatedPlaylist = {
      playlist_id: playlistId,
      user_id: claims.id,
      track_list: playlist.track_list.filter((word) => word != trackId),
    };

    const result = await dbPlaylist.update(updatedPlaylist);
    return {
      data: result,
      success: true,
    };
  });
  fastify.get('/playlists', async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const playlists = await dbPlaylist.getByUserId(claims.id);

    return {
      data: playlists,
      success: true,
    };
  });
  fastify.get('/playlists/:id', async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    const playlist = await dbPlaylist.getById(req.params.id, claims.id);
    playlist.tracks = await getTracks(playlist.track_list);

    return {
      data: playlist,
      success: true,
    };
  });

  fastify.delete('/playlists/:id', async (req) => {
    await dbPlaylist.remove(req.params.id);
    return {
      success: true,
    };
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
    return {
      data: room,
      success: true,
    };
  });
  fastify.get('/rooms', async () => {
    const result = await dbRooms.getAll();
    return {
      data: result,
      success: true,
    };
  });
  fastify.get('/rooms/more', roomsGetMoreOpts, async (req) => {
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);

    const { rooms, total, totalPages } = await dbRooms.getMore(limit, page);
    return {
      data: {
        rooms,
        total,
        total_pages: totalPages,
      },
      success: true,
    };
  });
  fastify.get('/rooms/:id', async (req) => {
    const room = await dbRooms.getById(req.params.id);
    return {
      data: room,
      success: true,
    };
  });
  fastify.delete('/rooms/:id', async (req, res) => {
    const claims = verify.verifyToken(req.cookies.jwt, res);
    await dbRooms.remove(req.params.id, claims.id);
    return {
      success: true,
    };
  });
}

module.exports = routes;
