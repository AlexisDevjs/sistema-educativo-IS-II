const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  const user = new User({
    email: 'test@utn.edu.ec',
    name: 'user test',
    ci: '1234567890',
    role: 'admin',
    password: '123'
  })

  await api.post('/api/users').send(user)
})

afterAll(() => {
  mongoose.connection.close()
})

describe('Login', () => {
  test('login with correct credentials', async () => {
    const credentials = {
      email: 'test@utn.edu.ec',
      password: '123'
    }

    await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})
