import axios from 'axios'

const baseUrl = '/api/courses'

async function getAll () {
  const response = await axios.get(baseUrl)
  return response.data
}

const coursesService = {
  getAll
}

export default coursesService
