import Landing from './Landing'
import Home from './Pages/Home'
import { Routes,Route } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Restaurant from './Pages/Restaurant'
import Shop from './Pages/Shop'
import Complaint from './Components/Complaint'
import { useState, useEffect } from 'react'
import complaintService from './services/complaints'

const App = () => {

  const [complaints, setComplaints] = useState([])
  const [complaint, setComplaint] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  console.log('complaints in App', complaints)

  useEffect(() => {
    console.log('effect')
    complaintService
      .getAll()
      .then(initialComplaints => {
        console.log('promise fulfilled')
        setComplaints(initialComplaints)
      })
  }, [])
  return (
    <div>
      {errorMessage}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>} />
        <Route path="/signup" element={<SignUp errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>} />
        <Route path="/restaurants" element={<Restaurant complaints = {complaints} setComplaints={ setComplaints} />} />
        <Route path="/shops" element={<Shop />} />
        <Route path="/restaurants/:id" element={<Complaint complaint={complaint} setComplaint={setComplaint}/>} />
      </Routes>
    </div>
  )
}

export default App