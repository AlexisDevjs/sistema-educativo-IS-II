const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email })

  const verifyPassword = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!user || !verifyPassword) {
    return response.status(401).json({ error: 'Invalid email or password' })
  }

  const userForToken = {
    email,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60
  })

  response.status(200).json({ token, email: user.email, name: user.name })
})

module.exports = loginRouter
