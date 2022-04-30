import Landing from "./Landing";
import Home from "./Pages/Home";
import { Routes, Route, useMatch } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Complaint from "./Components/Complaint";
import { useState, useEffect } from "react";
import complaintService from "./services/complaints";
import { useNavigate } from "react-router-dom";
import { AppBar, styled, Toolbar, Typography } from "@mui/material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const App = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [complaint, setComplaint] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  console.log("complaints in App", complaints);

  useEffect(() => {
    console.log("effect");
    complaintService.getAll().then((initialComplaints) => {
      console.log("promise fulfilled");
      setComplaints(initialComplaints);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBadmouthUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log("JSON.parse user", user);

      setUser(user);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    setUser(null);
    navigate("./home");
  };

  const match = useMatch("/complaints/:id");
  console.log("complaint after match", complaints);
  console.log("match", match);

  const complaintLocated = match
    ? complaints.find((complaint) => complaint.id === match.params.id)
    : null;
  console.log("complaintLocated", complaintLocated);

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
                complaint={complaintLocated}
                setComplaint={setComplaint}
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
        <Routes>
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
            path="/:id"
            element={
              <Complaint
                handleLogout={handleLogout}
                user={user}
                complaint={complaintLocated}
                setComplaints={setComplaints}
                setComplaint={setComplaint}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
