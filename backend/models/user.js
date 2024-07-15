const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
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
    enum: ['admin', 'docente', 'estudiante']
  },
  passwordHash: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  ci: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
