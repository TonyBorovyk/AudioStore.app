process.env.NODE_ENV = 'test';

const fastify = require('fastify');
const routes = require('../albums');
const { albums: dbAlbums, artists: dbArtists } = require('../../db');
const getTransform = require('../../services/transform');

const app = fastify();
routes(app);

dbAlbums.create = jest.fn().mockReturnValue([
  {
    artist_id: 1,
    artist_name: 'Imagine Dragons',
    album_id: 1,
    album_name: 'Origins',
    cover:
      'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
    artist_list: [1, 2],
  },
  {
    artist_id: 3,
    artist_name: 'Queen',
    album_id: 2,
    album_name: 'Greatest Hits',
    cover:
      'https://www.udiscovermusic.com/wp-content/uploads/2017/11/Queen-Greatest-Hits.jpg',
    artist_list: [3],
  },
  {
    artist_id: 4,
    artist_name: 'Twenty One Pilots',
    album_id: 3,
    album_name: 'Blurryface',
    cover:
      'https://uk.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Twenty_One_Pilots_-_Blurryface.png#/media/Файл:Twenty_One_Pilots_-_Blurryface.png',
    artist_list: [4],
  },
]);

dbAlbums.getAll = jest.fn().mockReturnValue([
  {
    artist_id: 1,
    artist_name: 'Imagine Dragons',
    album_id: 1,
    album_name: 'Origins',
    cover:
      'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
    artist_list: [1, 2],
  },
  {
    artist_id: 3,
    artist_name: 'Queen',
    album_id: 2,
    album_name: 'Greatest Hits',
    cover:
      'https://www.udiscovermusic.com/wp-content/uploads/2017/11/Queen-Greatest-Hits.jpg',
    artist_list: [3],
  },
  {
    artist_id: 4,
    artist_name: 'Twenty One Pilots',
    album_id: 3,
    album_name: 'Blurryface',
    cover:
      'https://uk.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Twenty_One_Pilots_-_Blurryface.png#/media/Файл:Twenty_One_Pilots_-_Blurryface.png',
    artist_list: [4],
  },
]);

dbAlbums.getMore = jest.fn().mockReturnValue({
  total: 3,
  totalPages: 2,
  albums: [
    {
      artist_id: 4,
      artist_name: 'Twenty One Pilots',
      album_id: 3,
      album_name: 'Blurryface',
      cover:
        'https://uk.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Twenty_One_Pilots_-_Blurryface.png#/media/Файл:Twenty_One_Pilots_-_Blurryface.png',
      artist_list: [4],
    },
  ],
});

dbAlbums.getById = jest.fn().mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
  album_id: 1,
  album_name: 'Origins',
  cover:
    'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
  artist_list: [1, 2],
});

dbAlbums.update = jest.fn().mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
  album_id: 1,
  album_name: 'Origins',
  cover:
    'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
  artist_list: [1, 2, 3],
});

dbAlbums.remove = jest.fn();

dbArtists.getById = jest.fn().mockImplementation((artistId) => {
  if (artistId === 1) {
    return {
      artist_id: 1,
      artist_name: 'Imagine Dragons',
    };
  } else if (artistId === 2) {
    return {
      artist_id: 2,
      artist_name: 'The Chainsmokers',
    };
  }
});; /*.mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
});*/

dbArtists.getByArtistName = jest.fn().mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
});

/*jest.mock('../../services/transform');

getTransform.getArtists = jest.fn().mockReturnValue({
  artist_id: 1,
  artist_name: 'Imagine Dragons',
});

getTransform.getFullAlbums = jest.fn().mockReturnValue([
  {
    artist_id: 1,
    artist_name: 'Imagine Dragons',
    album_id: 1,
    album_name: 'Origins',
    cover:
      'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
    artist_list: '[1, 2]',
  },
]);*/

describe('Test the root path', () => {
  test('It should response the POST method', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/',
      body: {
        artist_name: 'Imagine Dragons',
        album_name: 'Origins',
        cover:
          'https://upload.wikimedia.org/wikipedia/ru/5/59/Origins_cover_%28Imagine_Dragons%29.jpg',
        artist_list: [1, 2],
      },
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).success).toBe(true);
  });

  test('It should response the POST method', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/add',
      body: {
        artist_id: 3,
        album_id: 1,
      },
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).success).toBe(true);
  });

  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
  });

  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/more',
      query: {
        limit: 2,
        page: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
  });
  test('It should response the GET method', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/:id',
      params: {
        id: 1,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
  });
  test('It should response the GET method', async () => {
    dbAlbums.getById.mockReturnValue(undefined);
    const response = await app.inject({
      method: 'GET',
      url: '/:id',
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
  });
  test('It should response the DELETE method', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/:id',
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).success).toBe(true);
  });
});
