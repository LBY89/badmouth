import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/complaints'


const getAll = (id) => {

  const request = axios.get(`${baseUrl}/${id}/comments/`)
  return request.then(response => response.data)
}

const create = async newObject => {
  // if not using async here, newly created comment does not have id, 
  // id is still generating in db side.  
  const response = await axios.post(`${baseUrl}/${newObject.complaintId}/comments`, newObject)
  return response.data
}
export default { getAll, create }