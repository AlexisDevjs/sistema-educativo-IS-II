const coursesRouter = require('express').Router()
const Course = require('../models/course')

coursesRouter.get('/', async (request, response) => {
  const courses = await Course.find({})
  response.json(courses)
})

coursesRouter.get('/:id', async (request, response) => {
  const course = await Course.findById(request.params.id)
  response.json(course)
})

coursesRouter.post('/', async (request, response) => {
  const course = new Course({
    ...request.body
  })

  const savedCourse = await course.save()
  response.json(savedCourse)
})
