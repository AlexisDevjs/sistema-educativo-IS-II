const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

describe('Register', () => {
  test('user created successfully:', async () => {
    const userToAdd = {
      email: 'test@utn.edu.ec',
      name: 'user test',
      ci: '1234567890',
      role: 'admin',
      password: '123'
    }

    await api
      .post('/api/users')
      .send(userToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})
