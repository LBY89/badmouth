import React from 'react'
import Card from '@mui/material/Card'
import { CardActions, Button } from '@mui/material'

import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia';

import { Link } from 'react-router-dom'

// const styledButton = {

// }

export default function ComplaintCard({ complaint }) {
  console.log('complaintn from CARD', complaint);
  const imgLink = `http://localhost:3001/api/${complaint.image}`

  return (
    <div>
      <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardMedia
        component="img"
        alt="screenshot"
        height="140"
        image={imgLink}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {complaint.title}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
        {complaint.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small"
        component={Link} to={`/complaints/${complaint.id}`} onClick={() => 
          localStorage.setItem('complaintStored', JSON.stringify(complaint))}
        >Learn More</Button>
      </CardActions>
    </Card>
    </div>
  )
}