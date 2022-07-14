import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const EditComplaint = ({
  display,
  setDisplay,
  id,
  updateComplaint,
  complaint,
}) => {
  const [title, setTitle] = useState(complaint.title)
  const [content, setContent] = useState(complaint.content)
  if (!display) {
    return null
  }

  const handleContent = (e) => {
    setContent(e.target.value)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const editForm = (e) => {
    e.preventDefault()
    updateComplaint({ id, title, content })
    setDisplay(false)
  }

  return (
    <div>
      <form onSubmit={editForm}>
        <TextField
          className="form-text-input"
          sx={{ width: '100%', maxWidth: 500 }}
          margin="normal"
          onChange={handleTitle}
          value={title}
          label={'title...'} //optional
        />
        <TextField
          className="form-text-input"
          sx={{ width: '100%', maxWidth: 500 }}
          margin="normal"
          multiline
          onChange={handleContent}
          value={content}
          label={'content...'} //optional
        />
        <Button type="submit">save</Button>
      </form>
    </div>
  )
}

export default EditComplaint
