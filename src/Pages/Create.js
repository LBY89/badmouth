import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@mui/material'
import { useState } from 'react'
import complaintService from '../services/complaints'

import { Convert } from 'mongo-image-converter' // helper function to convert image to string?

const StyledForm = {
  marginTop: 10,
  marginBottom: 10,
}

const Create = ({ setComplaints, complaints }) => {
  const [category, setCategory] = useState('restaurant')
  const [complaintContent, setComplaintContent] = useState('')
  const [complaintTitle, setComplaintTitle] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const onFileChange = (event) => {
    event.preventDefault()
    setSelectedFile(event.target.files[0])
  }
  const submitComplaint = async (e) => {
    e.preventDefault()
    if (!complaintTitle || !complaintContent || !selectedFile) {
      return alert('Title, Content and Image upload required')
    }

    try {
      const convertedImage = await Convert(selectedFile)
      //console.log('covertedImage', convertedImage)

      if (convertedImage) {
        const formData = {
          title: complaintTitle,
          content: complaintContent,
          image: convertedImage,
        }

        console.log('formdata', formData)

        complaintService.create(formData).then((returnedComplaint) => {
          setComplaints(complaints.concat(returnedComplaint))
        })
      } else {
        console.log('The file is not in format of image/jpeg or image/png')
      }
    } catch (error) {
      console.warn(error.message)
    }

    console.log('NEW COMPLAINTS', complaints)
    setComplaintContent('')
    setComplaintTitle('')
  }

  const handleComplaintContent = (e) => {
    setComplaintContent(e.target.value)
  }

  const handleComplaintTitle = (e) => {
    setComplaintTitle(e.target.value)
  }

  return (
    <div style={{ width: 500 }}>
      <form style={StyledForm}>
        <div>
          <TextField
            className="form-text-input"
            sx={{ width: '100%', maxWidth: 500 }}
            onChange={handleComplaintTitle}
            value={complaintTitle}
            label={'title...'} //optional
          />
        </div>
        <div>
          <TextField
            className="form-text-input"
            sx={{ width: '100%', maxWidth: 500 }}
            margin="normal"
            multiline
            onChange={handleComplaintContent}
            value={complaintContent}
            label={'content...'} //optional
          />
        </div>
        <div>
          <FormControl style={StyledForm}>
            <FormLabel>Good stuff in life</FormLabel>
            <RadioGroup
              row
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
            >
              <FormControlLabel
                control={<Radio />}
                label="Restaurant"
                value="restaurant"
              />
              <FormControlLabel
                control={<Radio />}
                label="Shops"
                value="shop"
              />
              <FormControlLabel
                control={<Radio />}
                label="Others"
                value="others"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <div>
            <input
              type={'file'}
              accept={'.png, .jpg, .jpeg, .gif'}
              onChange={onFileChange}
            />
          </div>
          <Button
            variant="outlined"
            sx={{ marginRight: 2 }}
            onClick={submitComplaint}
          >
            Submit a complaint
          </Button>
          <Button variant="outlined">Reset</Button>
        </div>
      </form>
    </div>
  )
}
export default Create
