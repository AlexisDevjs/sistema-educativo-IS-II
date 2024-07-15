const subjectRouter = require('express').Router()
const Subject = require('../models/subject')
const User = require('../models/user')

subjectRouter.get('/', async (request, response) => {
  const subjects = await Subject.find({}).populate('teacher', {
    name: 1,
    email: 1,
    ci: 1
  })

  response.json(subjects)
})

subjectRouter.get('/:id', async (request, response) => {
  const subject = await Subject.findById(request.params.id)
  response.json(subject)
})

subjectRouter.post('/', async (request, response) => {
  const { body } = request

  const userOfDb = await User.findById(body.teacher)

  if (!userOfDb) {
    return response.status(404).json({ error: 'user not found' })
  }

  const subject = new Subject({
    ...body,
    createdAt: new Date()
  })

  const savedSubject = await subject.save()

  userOfDb.subject = savedSubject._id
  await userOfDb.save()

  response.status(201).json(savedSubject)
})

module.exports = subjectRouter
