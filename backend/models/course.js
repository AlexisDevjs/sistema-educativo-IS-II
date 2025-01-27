const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  students: {
    type: Number,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

courseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
