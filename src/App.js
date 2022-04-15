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
import { useNavigate } from 'react-router-dom'


const App = () => {

  const navigate = useNavigate()

  const [complaints, setComplaints] = useState([])
  const [complaint, setComplaint] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null) 
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBadmouthUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('JSON.parse user', user)

      setUser(user)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.clear()
    setUser(null)
    navigate('./')
  }

  return (
    <div>
      {errorMessage}
      {user === null ? 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn user={user} setUser={setUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>} />
        <Route path="/signup" element={<SignUp errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>} />
        <Route path="/restaurants" element={<Restaurant complaints = {complaints} setComplaints={ setComplaints} />} />
        <Route path="/shops" element={<Shop />} />
        <Route path="/restaurants/:id" element={<Complaint complaint={complaint} setComplaint={setComplaint}/>} />
      </Routes> 
      : 
      <div>
        <p>{user.firstname} logged in <button onClick={handleLogout}>loggout</button></p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Home />} />
          <Route path="/signup" element={<Home />} />
          <Route path="/restaurants" element={<Restaurant complaints = {complaints} setComplaints={ setComplaints} user={user}/>} />
          <Route path="/shops" element={<Shop />} />
          <Route path="/restaurants/:id" element={<Complaint complaint={complaint} setComplaint={setComplaint}/>} />
      </Routes>
      </div>
      }
      
    </div>
  )
}

export default App