process.env.NODE_ENV = 'test';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verify = require('../verifyToken');

const JWT_SECRET = process.env.JWT_SECRET;

const fastify = require('fastify');
const routes = require('../profile');

const {
  users: dbUsers,
  playlist: dbPlaylist,
  rooms: dbRooms,
} = require('../../db');
const getTransform = require('../../services/transform');

const app = fastify();
routes(app);

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

dbRooms.remove = jest.fn();

jest.mock('../../services/transform');

getTransform.getTracks = jest.fn().mockReturnValue({
  album_id: 1,
  track_id: 1,
  artist_id: 1,
  category_id: 1,
  track_name: 'Boomerang',
  lyrics:
    'How many lies do we have to tell?\n To keep from saying that I wish you well\n How many times, I said I\'\'m moving on?\n How many times that false alarm goes off (goes off), goes off (goes off)?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n How many tears do we have to cry?\n How many sleepless lonely nights?\n To work it out, is it worth it now?\n Should we go ahead or should we turn around?\n I know, I\'\'ll see you tomorrow\n \'\'Cause I\'\'m bad at letting you go, letting you go\n Letting you go, letting you go\n Moving on, moving on\n Moving on, moving on\n I\'\'m ready to go, ready to go\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Just because it isn\'\'t easy, doesn\'\'t mean that it is wrong\n Everything that we have been working on, working on so long\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n You\'\'re my boomer-boomer-boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang\n Letting you go, letting you go (boomerang)\n Letting you go, letting you go (boomerang)\n Moving on, moving on (boomerang)\n Moving on, moving on (boomerang)\n I\'\'m ready to go, ready to go (boomerang)\n Ready to throw, ready to throw (boomerang)\n You\'\'re my boomerang, boomerang\n You\'\'re my boomerang, boomerang',
  duration: '3:07',
  cover: 'https://i-tsmusic.com/i/img/songs/2031.jpg',
  release_year: 2018,
  time_added: '2021-05-16 16:00:00',
  track_url:
    'https://dl.muzonovs.ru/uploads/files/2018-11/1541696455_1541689025_02-boomerang.mp3',
  artist_list: [1],
});

jest.mock('../verifyToken');

const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);

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
  });

  test('It should response the DELETE method', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/:id',
      params: {
        id: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
  });
});
