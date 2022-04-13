import Landing from './Landing'
import Home from './Pages/Home'
import { Routes,Route } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Restaurant from './Pages/Restaurant'
import Shop from './Pages/Shop'
import Complaint from './Components/Complaint'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [complaints, setComplaints] = useState([])
  const [complaint, setComplaint] = useState(null)
  console.log('refresh presses child')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/complaints')
      .then(response => {
        console.log('promise fulfilled')
        setComplaints(response.data)
      })
  }, [])
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurants" element={<Restaurant complaints = {complaints} setComplaints={ setComplaints} />} />
        <Route path="/shops" element={<Shop />} />
        <Route path="/restaurants/:id" element={<Complaint complaint={complaint} setComplaint={setComplaint}/>} />
      </Routes>
    </div>
  )
}

export default App