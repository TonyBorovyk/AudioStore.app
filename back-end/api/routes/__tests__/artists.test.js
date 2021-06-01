const fastify = require('fastify');
const routes = require('../artists');
const { artists: dbArtists } = require('../../db');

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

describe('Test the root path', () => {
  test('It should response the POST method', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/',
      body: {
        artist_name: 'Imagine Dragons',
      },
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data[0].artist_name).toBe(
      'Imagine Dragons'
    );
    expect(JSON.parse(response.body).data[0].artist_id).toBe(1);
  });

  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data[0].artist_name).toBe(
      'Imagine Dragons'
    );
    expect(JSON.parse(response.body).data[0].artist_id).toBe(1);
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
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data.artists[0].artist_name).toBe(
      'Imagine Dragons'
    );
    expect(JSON.parse(response.body).data.artists[0].artist_id).toBe(1);
    expect(JSON.parse(response.body).data.total).toBe(3);
  });
  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/:id',
      params: {
        id: 2,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
    expect(JSON.parse(response.body).data.artist_name).toBe('The Chainsmokers');
    expect(JSON.parse(response.body).data.artist_id).toBe(2);
  });
  test('It should response the DELETE method', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/:id',
      params: {
        id: 3,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
  });
});
