process.env.NODE_ENV = 'test';

const fastify = require('fastify');
const routes = require('../albums');
const {
  albums: dbAlbums,
  artists: dbArtists,
  users: dbUsers,
} = require('../../db');
const verify = require('../verifyToken');
const app = fastify();
routes(app);
const request = require('supertest');

dbAlbums.getAll = jest.fn().mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
  album_id: 1,
  album_name: 'Origins',
  cover:
    'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
  artist_list: '[1, 2]',
});

dbAlbums.getMore = jest.fn().mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
  album_id: 1,
  album_name: 'Origins',
  cover:
    'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
  artist_list: '[1, 2]',
});

dbAlbums.getById = jest.fn().mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
  album_id: 1,
  album_name: 'Origins',
  cover:
    'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
  artist_list: '[1, 2]',
});

dbArtists.getById = jest.fn().mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
});

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    console.log(response.body);
    expect(response.statusCode).toBe(201);
  });

  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/more',
    });
    console.log(response.body);
    expect(response.statusCode).toBe(201);
  });
  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/:id',
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
