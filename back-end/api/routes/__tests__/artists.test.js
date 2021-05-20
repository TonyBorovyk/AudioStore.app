process.env.NODE_ENV = 'test';

const fastify = require('fastify');
const routes = require('../artists');
const { artists: dbArtists } = require('../../db');
const {
  transform: { getArtists, getFullAlbums },
} = require('../services');

const app = fastify();
routes(app);

dbArtists.create = jest.fn().mockReturnValue([
  {
    artist_id: 1,
    artist_name: 'Imagine Dragons',
  },
  {
    artist_id: 2,
    artist_name: 'The Chainsmokers',
  },
  {
    artist_id: 3,
    artist_name: 'Queen',
  },
]);

dbArtists.getAll = jest.fn().mockReturnValue([
  {
    artist_id: 1,
    artist_name: 'Imagine Dragons',
  },
  {
    artist_id: 2,
    artist_name: 'The Chainsmokers',
  },
  {
    artist_id: 3,
    artist_name: 'Queen',
  },
]);

dbArtists.getMore = jest.fn().mockReturnValue({
  total: 3,
  totalPages: 2,
  artists: [
    {
      artist_id: 1,
      artist_name: 'Imagine Dragons',
    },
    {
      artist_id: 2,
      artist_name: 'The Chainsmokers',
    },
    {
      artist_id: 3,
      artist_name: 'Queen',
    },
  ],
});

dbArtists.getById = jest.fn().mockReturnValue({
  artist_id: 2,
  artist_name: 'The Chainsmokers',
});

dbArtists.getByArtistName = jest.fn().mockReturnValue({
  artist_id: 2,
  artist_name: 'The Chainsmokers',
});

dbArtists.remove = jest.fn().mockReturnValue([
  {
    artist_id: 1,
    artist_name: 'Imagine Dragons',
  },
  {
    artist_id: 2,
    artist_name: 'The Chainsmokers',
  },
]);

getArtists.jest.fn();
getFullAlbums.jest.fn();

describe('Test the root path', () => {
  test('It should response the POST method', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/',
      body: {
        artist_name: 'Imagine Dragons',
      },
    });
    console.log(response.body);
    expect(response.statusCode).toBe(201);
  });

  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/more',
      query: {
        page: 1,
        limit: 2,
      },
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/:id',
      params: {
        id: 2,
      },
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
  test('It should response the DELETE method', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/:id',
      params: {
        id: 3,
      },
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
