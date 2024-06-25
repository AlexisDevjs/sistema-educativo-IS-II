const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'teacher', 'student']
  },
  passwordHash: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  ci: {
    type: String,
    required: true,
    unique: true
  }
})

userScheme.plugin(uniqueValidator)

userScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userScheme)
