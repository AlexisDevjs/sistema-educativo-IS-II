const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)
const Subject = require('../models/subject')
const User = require('../models/user')

beforeEach(async () => {
  await Subject.deleteMany({})
  await User.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

describe('Subject', () => {
  test('created subject successfully', async () => {
    const newUser = {
      email: 'eaparra@utn.edu.ec',
      ci: '1003818992',
      name: 'EMILIANO ANDRES PARRA RIVERA',
      password: '123Em',
      role: 'docente'
    }

    const user = await api.post('/api/users').send(newUser)

    const teacher = user.body

    const newSubject = {
      name: 'Estudios Sociales',
      teacher: teacher.id,
      description: 'Educación básica'
    }

    await api.post('/api/subjects').send(newSubject).expect(201)
  })
})
