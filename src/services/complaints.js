import axios from 'axios'
const baseUrl = '/api/complaints'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const deleteOne = async (id) => {
  console.log('from deleteOne')

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = (id, newObject) => {
  console.log(newObject)
  const request = axios.put(`${baseUrl}/${id}`, newObject)

  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('newObject from response', newObject)
  const response = await axios.post(baseUrl, newObject, config)
  //console.log('newObject from response', newObject);

  return response.data
}

export default { getAll, create, setToken, deleteOne, update }
