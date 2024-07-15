const coursesRouter = require('express').Router()
const Course = require('../models/course')
const User = require('../models/user')

coursesRouter.get('/', async (request, response) => {
  const courses = await Course.find({}).populate('teacher', {
    name: 1,
    email: 1,
    ci: 1
  })
  response.json(courses)
})

coursesRouter.get('/:id', async (request, response) => {
  const course = await Course.findById(request.params.id)
  response.json(course)
})

coursesRouter.post('/', async (request, response) => {
  const { body } = request

  const course = new Course({
    ...body,
    createdAt: new Date()
  })

  const user = await User.findById(body.teacher)

  const savedCourse = await course.save()

  user.course = savedCourse._id
  await user.save()

  response.status(201).json(savedCourse)
})

module.exports = coursesRouter
