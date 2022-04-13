import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import axios from 'axios'
import { useState, useEffect } from 'react'

const Restaurant =( props )=> {

    const {complaints, setComplaints} = props

    const [newComplaint, setNewComplaint] =useState([])

    
      const addComplaint =(e) => {

        e.preventDefault()
        const newComplaintObj = {
            content: newComplaint,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: complaints.length +1 
        }
        axios
        .post('http://localhost:3001/complaints', newComplaintObj)
        .then(response => {
            setComplaints(complaints.concat(newComplaintObj))
            setNewComplaint('')
        })
        
      }


      const handleComplaintChange =(e)=> {
        setNewComplaint(e.target.value)
      }
    return(
        <div>
            <div>
                <Button component={Link} to="/restaurants">
                    restaurant
                </Button>
                <Button component={Link} to="/shops">
                    shops
                </Button>
                <Button component={Link} to="/home">
                    home
                </Button>
                <Button component={Link} to="/shops">
                    xxx
                </Button>
            </div> 
            <form onSubmit={addComplaint}>
                <input value={newComplaint} onChange={handleComplaintChange}/>
                <button type="submit">save</button>
            </form> 
            {complaints.map(complaint => 
            <p key={complaint.id}>
                <Button component={Link} to={`/restaurants/${complaint.id}`} onClick={() => 
                    localStorage.setItem('complaintStored', JSON.stringify(complaint))}>
                    {complaint.content}
                </Button>
            </p>)}
        </div>
    )
}

export default Restaurant 