import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/complaints'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
        }
  console.log('newObject from response', newObject);
  const response = await axios.post(baseUrl, newObject, config)
  //console.log('newObject from response', newObject);
  
  return response.data
}

export default { getAll, create, setToken }