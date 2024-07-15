const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})

subjectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject
