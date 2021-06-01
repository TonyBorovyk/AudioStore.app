const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');
const JWT_SECRET = process.env.JWT_SECRET;
const fastify = require('fastify');
const routes = require('../profile');

const {
  artists: dbArtists,
  users: dbUsers,
  playlist: dbPlaylist,
  rooms: dbRooms,
  track: dbTrack,
} = require('../../db');
const getTransform = require('../../services/transform');

const app = fastify();
routes(app);

dbArtists.getById = jest.fn().mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
});

dbTrack.info.getById = jest.fn().mockReturnValue({
  category_name: 'Pop rock',
  album_name: 'Origins',
  album_cover:
    'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
  artist_name: 'Imagine Dragons',
  album_id: 1,
  track_id: 2,
  artist_id: 1,
  category_id: 1,
  track_name: 'Natural',
  lyrics:
    "Will you hold the line?\n When every one of them has given up and given in, tell me\n In this house of mine\n Nothing ever comes without a consequence or cost, tell me\n Will the stars align?\n Will heaven step in will it save us from our sin, will it?\n ''Cause this house of mine stands strong\n That''s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you''re standing on the edge face up\n ''Cause you''re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you''re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you''re a natural\n Will somebody\n Let me see the light within the dark trees shadowing\n What''s happening?\n Looking through the glass find the wrong within the past knowing\n Oh, we are the youth\n Cut until it bleeds inside a world without the peace, face it\n A bit of the truth, the truth\n That''s the price you pay\n Leave behind your heart and cast away\n Just another product of today\n Rather be the hunter than the prey\n And you''re standing on the edge face up\n ''Cause you''re a natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you''re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you''re a natural\n Deep inside me\n I''m fading to black I''m fading\n Took an oath by the blood on my hand won''t break it\n I can taste it the end is upon us I swear\n Gonna make it\n I''m gonna make it\n Natural\n A beating heart of stone\n You gotta be so cold\n To make it in this world\n Yeah, you''re a natural\n Living your life cutthroat\n You gotta be so cold\n Yeah, you''re a natural\n Natural\n Yeah, you''re a natural",
  duration: '3:07',
  cover:
    'https://upload.wikimedia.org/wikipedia/en/1/10/Imagine_Dragons_Natural.png?a4a81394e8a883a6d2de95253a09e9b0=9c9fb62266f5dfc4ddd189970d218a9b',
  release_year: 2018,
  time_added: '2021-05-16 16:00:00',
  track_url: 'https://dl3.ru-music.cc/mp3/39995.mp3',
  artist_list: [1],
});

dbUsers.getById = jest.fn().mockReturnValue({
  password: 'user1234',
  user_id: 1,
  first_name: 'Mykola',
  last_name: 'Onyshchuk',
  username: 'nick1',
  email: 'mykolaon1@gmail.com',
  role: 'base',
});

dbPlaylist.create = jest.fn().mockReturnValue([
  {
    playlist_id: 1,
    playlist_title: 'Imagine',
    user_id: 1,
    last_update: '2020-05-16 12:00:00',
    track_list: [1, 2],
  },
  {
    playlist_id: 2,
    playlist_title: 'My playlist',
    user_id: 1,
    last_update: '2020-05-16 12:00:00',
    track_list: [1, 3, 4, 7],
  },
  {
    playlist_id: 3,
    playlist_title: 'Favorites',
    user_id: 2,
    last_update: '2020-05-16 12:00:00',
    track_list: [1, 3, 7],
  },
]);

dbPlaylist.getById = jest.fn().mockReturnValue({
  playlist_id: 1,
  playlist_title: 'Imagine',
  user_id: 1,
  last_update: '2020-05-16 12:00:00',
  track_list: [1, 2],
});

dbPlaylist.getByUserId = jest.fn().mockReturnValue([
  {
    playlist_id: 1,
    playlist_title: 'Imagine',
    user_id: 1,
    last_update: '2020-05-16 12:00:00',
    track_list: [1, 2],
  },
  {
    playlist_id: 2,
    playlist_title: 'My playlist',
    user_id: 1,
    last_update: '2020-05-16 12:00:00',
    track_list: [1, 3, 4, 7],
  },
]);

dbPlaylist.update = jest.fn().mockReturnValue({
  playlist_id: 1,
  playlist_title: 'Imagine',
  user_id: 1,
  last_update: '2020-05-16 12:00:00',
  track_list: [1, 2, 7],
});

dbPlaylist.remove = jest.fn();

dbRooms.create = jest.fn().mockReturnValue([
  {
    room_id: 1,
    admin_id: 1,
    room_name: 'Room1',
  },
  {
    room_id: 2,
    admin_id: 2,
    room_name: 'Room_Anton',
  },
  {
    room_id: 3,
    admin_id: 3,
    room_name: 'Room_Alexey',
  },
]);

dbRooms.getAll = jest.fn().mockReturnValue([
  {
    room_id: 1,
    admin_id: 1,
    room_name: 'Room1',
  },
  {
    room_id: 2,
    admin_id: 2,
    room_name: 'Room_Anton',
  },
  {
    room_id: 3,
    admin_id: 3,
    room_name: 'Room_Alexey',
  },
]);

dbRooms.getById = jest.fn().mockReturnValue({
  room_id: 1,
  admin_id: 1,
  room_name: 'Room1',
});

dbRooms.getMore = jest.fn().mockReturnValue({
  rooms: [
    {
      room_id: 3,
      admin_id: 3,
      room_name: 'Room_Alexey',
    },
  ],
  total: 3,
  total_pages: 1,
});

dbRooms.remove = jest.fn();

jest.mock('../verifyToken');

const token = jwt.sign({ id: 1 }, `${process.env.JWT_SECRET}`);

verify.verifyToken = jest.fn().mockReturnValue({ id: 1 });

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    await app.register(require('fastify-cookie'));
    const response = await app.inject({
      method: 'GET',
      url: '/',
      headers: {
        cookies: {
          jwt: token,
        },
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).user.user_id).toBe(1);
    expect(JSON.parse(response.body).user.first_name).toBe('Mykola');
  });

  test('It should response the POST method', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/playlists',
      headers: {
        cookies: {
          jwt: token,
        },
      },
      body: {
        playlist_title: 'Favorites',
        track_list: [1, 3, 7],
      },
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data[0].user_id).toBe(1);
    expect(JSON.parse(response.body).data[0].playlist_title).toBe('Imagine');
  });

  test('It should response the POST method', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/playlists/add',
      headers: {
        cookies: {
          jwt: token,
        },
      },
      body: {
        playlist_id: 3,
        track_id: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data.user_id).toBe(1);
    expect(JSON.parse(response.body).data.playlist_title).toBe('Imagine');
  });

  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/playlists',
      headers: {
        cookies: {
          jwt: token,
        },
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data[1].playlist_id).toBe(2);
    expect(JSON.parse(response.body).data[1].playlist_title).toBe(
      'My playlist'
    );
  });

  test('It should response the DELETE method', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/playlists/delete',
      headers: {
        cookies: {
          jwt: token,
        },
      },
      body: {
        playlist_id: 3,
        track_id: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data.playlist_id).toBe(1);
    expect(JSON.parse(response.body).data.playlist_title).toBe('Imagine');
  });

  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/playlists/:id',
      headers: {
        cookies: {
          jwt: token,
        },
      },
      params: {
        id: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data.playlist_id).toBe(1);
    expect(JSON.parse(response.body).data.playlist_title).toBe('Imagine');
  });

  test('It should response the DELETE method', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/playlists/:id',
      params: {
        id: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
  });

  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/rooms',
      headers: {
        cookies: {
          jwt: token,
        },
      },
      body: {
        room_name: 'Room1',
      },
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data[0].room_id).toBe(1);
    expect(JSON.parse(response.body).data[0].room_name).toBe('Room1');
  });

  test('It should response the POST method', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/rooms/add',
      headers: {
        cookies: {
          jwt: token,
        },
      },
      body: {
        room_name: 'Room1',
        admin_id: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data[0].room_id).toBe(1);
    expect(JSON.parse(response.body).data[0].room_name).toBe('Room1');
  });
  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/rooms',
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data[0].room_id).toBe(1);
    expect(JSON.parse(response.body).data[0].room_name).toBe('Room1');
  });
  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/rooms/more',
      query: {
        limit: 2,
        page: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data.rooms[0].room_id).toBe(3);
    expect(JSON.parse(response.body).data.rooms[0].room_name).toBe(
      'Room_Alexey'
    );
  });
  test('It should response the GET method', async () => {
    //dbAlbums.getById.mockReturnValue(undefined);
    const response = await app.inject({
      method: 'GET',
      url: '/rooms/:id',
      params: {
        id: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data.room_id).toBe(1);
    expect(JSON.parse(response.body).data.room_name).toBe('Room1');
  });
  test('It should response the DELETE method', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/rooms/:id',
      headers: {
        cookies: {
          jwt: token,
        },
      },
      params: {
        id: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
  });
});
