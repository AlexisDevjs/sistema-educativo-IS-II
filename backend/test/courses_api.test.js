const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Course = require('../models/course')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await Course.deleteMany({})
  await User.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

describe('Course', () => {
  test('courses are returned as json', async () => {
    await api
      .get('/api/courses')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('created course successfu', async () => {
    const newUser = {
      email: 'eaparra@utn.edu.ec',
      ci: '1003818992',
      name: 'EMILIANO ANDRES PARRA RIVERA',
      password: '123Em',
      role: 'docente'
    }

    const user = await api.post('/api/users').send(newUser)
    const teacher = user.body

    const course = {
      level: '10mo. de básica',
      students: 25,
      teacher: teacher.id
    }

    await api
      .post('/api/courses')
      .send(course)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})
