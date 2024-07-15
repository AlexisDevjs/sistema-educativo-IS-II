import axios from 'axios'

const baseUrl = '/api/subjects'

async function getAll () {
  const response = await axios.get(baseUrl)
  return response.data
}

const subjectsService = {
  getAll
}

export default subjectsService
