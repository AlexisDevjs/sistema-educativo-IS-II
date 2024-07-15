const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('subject', {
    name: 1,
    description: 1,
    createdAt: 1
  })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const { email, password, name } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password invalid' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const userToAdd = new User({
    email,
    name: name.toUpperCase(),
    passwordHash,
    ci: request.body.ci,
    date: new Date(),
    role: request.body.role || 'docente'
  })

  const savedUser = await userToAdd.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
