process.env.NODE_ENV = 'test';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const fastify = require('fastify');
const plug = require('fastify-plugin');
const routes = require('../auth');
const { users: dbUsers } = require('../../db');

const app = fastify();
routes(app);

dbUsers.emailExists = jest.fn();
dbUsers.usernameExists = jest.fn();
dbUsers.create = jest.fn();
dbUsers.getByEmail = jest.fn();
describe('Test the root path', () => {
  test('It should response the POST method when testing signup with the correct password', async () => {
    dbUsers.getByEmail.mockReturnValue({
      user_id: 1,
      fist_name: 'User',
      last_name: 'Audiostore',
      username: 'userAud',
      email: 'user253@gmail.com',
      password: '$2a$10$MUtwiJkDWy6eewLTmqA79.f5Dg5MQzJjb8Lqy6twK4AekhYZcCSUG',
      role: 'body',
    });
    await app.register(require('fastify-cookie'));
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      body: {
        email: 'user253@gmail.com',
        password: 'Qwerty253',
      },
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  test('It should response the POST method when testing signup with the incorrect password', async () => {
    dbUsers.getByEmail.mockReturnValue({
      user_id: 1,
      fist_name: 'User',
      last_name: 'Audiostore',
      username: 'userAud',
      email: 'user253@gmail.com',
      password: 'Qwerty253',
      role: 'body',
    });
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      body: {
        email: 'user253@gmail.com',
        password: 'Qwerty253',
      },
    });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).success).toBe(false);
    expect(JSON.parse(response.body).message).toBe('Password is incorrect');
  });

  test('It should response the POST method when testing signup with non-existing user', async () => {
    dbUsers.getByEmail.mockReturnValue(undefined);
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      body: {
        email: 'user253@gmail.com',
        password: 'Qwerty253',
      },
    });
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body).success).toBe(false);
    expect(JSON.parse(response.body).message).toBe('User not found');
  });

  test('It should response the POST method when testing signup with unregistered username and email', async () => {
    dbUsers.emailExists.mockReturnValue(false);
    dbUsers.usernameExists.mockReturnValue(false);
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      body: {
        email: 'user253@gmail.com',
        username: 'user253',
        first_name: 'User',
        last_name: 'Audiostore',
        password: 'Qwerty253',
      },
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).success).toBe(true);
  });

  test('It should response the POST method when testing signup with registered username', async () => {
    dbUsers.emailExists.mockReturnValue(false);
    dbUsers.usernameExists.mockReturnValue(true);
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      body: {
        email: 'user253@gmail.com',
        username: 'user253',
        first_name: 'User',
        last_name: 'Audiostore',
        password: 'Qwerty253',
      },
    });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).success).toBe(false);
    expect(JSON.parse(response.body).message).toBe('username exist');
  });

  test('It should response the POST method when testing signup with registered email', async () => {
    dbUsers.emailExists.mockReturnValue(true);
    dbUsers.usernameExists.mockReturnValue(false);
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      body: {
        email: 'user253@gmail.com',
        username: 'user253',
        first_name: 'User',
        last_name: 'Audiostore',
        password: 'Qwerty253',
      },
    });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).success).toBe(false);
    expect(JSON.parse(response.body).message).toBe('email exist');
  });

  test('It should response the POST method when testing logout with registered email', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/logout',
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).success).toBe(true);
  });
});
