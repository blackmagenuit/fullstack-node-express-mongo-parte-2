const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../server');
const User = require('../src/models/User');

let mongoServer;
let token;

test.before(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri('fullstack_db'));

  await User.create({
    name: 'Ana Gomez',
    email: 'ana@example.com',
    password: '$2a$10$4oJj4j3P3z2XvPhMpykX0eGm4A4U8mFv7K4FZXO6bMlu1x7nP2r0m',
    role: 'admin',
  });

  await User.create({
    name: 'Luis Perez',
    email: 'luis@example.com',
    password: '$2a$10$4oJj4j3P3z2XvPhMpykX0eGm4A4U8mFv7K4FZXO6bMlu1x7nP2r0m',
    role: 'editor',
  });
});

test.after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('registro y login', async () => {
  const register = await request(app)
    .post('/api/auth/register')
    .send({ name: 'Maria', email: 'maria@example.com', password: '123456', role: 'viewer' });

  assert.equal(register.status, 201);
  assert.ok(register.body.token);

  const login = await request(app)
    .post('/api/auth/login')
    .send({ email: 'maria@example.com', password: '123456' });

  assert.equal(login.status, 200);
  assert.ok(login.body.token);
  token = login.body.token;
});

test('obtiene usuarios con filtros y paginación', async () => {
  const res = await request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${token}`)
    .query({ search: 'ana', role: 'admin', page: 1, limit: 10 });

  assert.equal(res.status, 200);
  assert.equal(res.body.total >= 1, true);
  assert.ok(res.body.page);
  assert.ok(res.body.pageSize);
  assert.ok(res.body.totalPages);
  assert.ok(Array.isArray(res.body.users));
  assert.ok(!res.body.users.some((user) => user.password));
});

test('sin token devuelve 401', async () => {
  const res = await request(app).get('/api/users');
  assert.equal(res.status, 401);
});

test('token inválido devuelve 401', async () => {
  const res = await request(app)
    .get('/api/users')
    .set('Authorization', 'Bearer invalido');

  assert.equal(res.status, 401);
});
