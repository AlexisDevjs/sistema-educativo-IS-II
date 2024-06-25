import axios from 'axios'

const baseUrl = '/api/users'

const register = async (userData) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (userData) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

const userServices = { register, getAll, create }

export default userServices
