import Landing from './Landing'
import Home from './Pages/Home'
import { Routes, Route, useMatch } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Complaint from './Components/Complaint'
import { useState, useEffect } from 'react'
import complaintService from './services/complaints'
import { useNavigate } from 'react-router-dom'
import Create from './Pages/Create'

import Layout from './Components/Layout'

const App = () => {
  const navigate = useNavigate()

  const [complaints, setComplaints] = useState([])
  const [, setComplaint] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    complaintService.getAll().then((initialComplaints) => {
      setComplaints(initialComplaints)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBadmouthUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('JSON.parse user', user)
      complaintService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const deleteSingleComplaint = (id) => {
    window.confirm('do you want to delete this complaint?') &&
      complaintService
        .deleteOne(id)
        .then(
          setComplaints(complaints.filter((complaint) => complaint.id !== id))
        )
    navigate('/')
  }

  const updateComplaint = async ({ id, ...complaintObj }) => {
    const updatedComplaint = await complaintService.update(id, complaintObj)
    console.log('UPDATED', updatedComplaint)
    setComplaints(
      complaints.map((complaint) =>
        complaint.id !== updatedComplaint.id ? complaint : updatedComplaint
      )
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.clear()
    setUser(null)
    navigate('./home')
  }

  const match = useMatch('/complaints/:id')
  console.log('complaint after match', complaints)
  console.log('match', match)

  const complaintLocated = match
    ? complaints.find((complaint) => complaint.id === match.params.id)
    : null
  console.log('complaintLocated', complaintLocated)

  return (
    <div>
      {errorMessage}

      {user === null ? (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={
              <Home
                user={user}
                handleLogout={handleLogout}
                complaints={complaints}
              />
            }
          />
          <Route
            path="/complaints/:id"
            element={
              <Complaint
                user={user}
                complaint={complaintLocated} /*setComplaint={setComplaint}*/
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                user={user}
                setUser={setUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                user={user}
                setUser={setUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route
              path="/create"
              element={
                <Create
                  setComplaints={setComplaints}
                  complaints={complaints}
                  setUser={setUser}
                  user={user}
                />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  handleLogout={handleLogout}
                  complaints={complaints}
                  setComplaints={setComplaints}
                />
              }
            />
            <Route
              path="/complaints/:id"
              element={
                <Complaint
                  handleLogout={handleLogout}
                  updateComplaint={updateComplaint}
                  user={user}
                  complaint={complaintLocated}
                  setComplaints={setComplaints}
                  setComplaint={setComplaint}
                  deleteSingleComplaint={deleteSingleComplaint}
                />
              }
            />
          </Routes>
        </Layout>
      )}
    </div>
  )
}

export default App
