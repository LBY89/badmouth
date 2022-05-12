
import {  TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@mui/material'
import {useState} from 'react'
import complaintService from '../services/complaints'

const StyledForm = {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }

const Create =({setComplaints, complaints})=> {
    const [category, setCategory] = useState('restaurant')
    const [complaintContent,setComplaintContent] = useState("")
    const [complaintTitle, setComplaintTitle] = useState("")

    const submitComplaint =(e)=> {
        e.preventDefault()
        const newComplaintObj = {
          title: complaintTitle,
          content: complaintContent
        }
        complaintService
        .create(newComplaintObj)
        .then(returnedComplaint => {
          setComplaints(complaints.concat(returnedComplaint))
        })
        setComplaintContent("")
        setComplaintTitle("")
      }
    
      const handleComplaintContent = (e) => {
        setComplaintContent(e.target.value)
      }

      const handleComplaintTitle = (e) => {
        setComplaintTitle(e.target.value)
      }

    return(
        <div>
            <form style={StyledForm}>
            <TextField
                onChange={handleComplaintTitle}
                value={complaintTitle}
                label={"title..."} //optional
              />
              <TextField
                onChange={handleComplaintContent}
                value={complaintContent}
                label={"complaint..."} //optional
              />
              <FormControl style={StyledForm}>
                <FormLabel>Good stuff in life</FormLabel>
                <RadioGroup row 
                value={category}
                onChange={(e) => {setCategory(e.target.value)}}>
                <FormControlLabel control={<Radio/>} label="Restaurant" value="restaurant"/>
                <FormControlLabel control={<Radio/>} label="Shops" value="shop"/>
                <FormControlLabel control={<Radio/>} label="Others" value="others"/>
                </RadioGroup>
              </FormControl>
              <Button onClick={submitComplaint}>Submit</Button>
              <Button >Reset</Button>
              </form>
        </div>
    )
}

export default Create