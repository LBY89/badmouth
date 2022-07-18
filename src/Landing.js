//import Button from '@mui/material/Button'
import * as React from 'react'
import './Css/LandingPage.css'

const Landing = () => {
  return (
    <div>
      <div className="container">
        <img src="../gossip.png" alt="badmouth log" className="image" />
        <div className="text-buttons">
          <div className="text">
            <span className="badmouth">BadMouth</span>
            <span className="description">
              Complaints make better Business.
            </span>
          </div>
          <div className="signin-up-buttons">
            <a href="/signin" className="signin-button">
              Sign in
            </a>
            <a href="/signup" className="signup-button">
              Sign up
            </a>
          </div>
          {/* <Button className="nonlogin-button" component={Link} to="/home">
            Just checking
          </Button> */}
          <a href="/home" className="nonlogin-button">
            Just checking
          </a>
        </div>
      </div>
      <div className="credit">
        © Made by &nbsp;
        <a className="pablo" href="https://github.com/pablo-maff">
          Pablo
        </a>{' '}
        & &nbsp;
        <a className="baoying" href="https://github.com/LBY89">
          Baoying
        </a>
      </div>
    </div>
  )
}

export default Landing
