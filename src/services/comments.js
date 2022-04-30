import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/complaints'

///api/complaints/:id/comments
const getAll = (id) => {
  console.log('id', id);
  
  const request = axios.get(`${baseUrl}/${id}/comments`)
  return request.then(response => response.data)
}

const create = async (id, newObject) => {
  // if not using async here, newly created comment does not have id, 
  // id is still generating in db side.  
  console.log('before response');
  
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  console.log('responsedata from commentservice', response.data);
  
  return response.data
  
}
export default { getAll, create }