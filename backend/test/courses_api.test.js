const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Course = require('../models/course')
const api = supertest(app)

