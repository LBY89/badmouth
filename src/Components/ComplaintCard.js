import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia';

import { Link } from 'react-router-dom'

// const styledButton = {

// }

export default function ComplaintCard({ complaint }) {
  console.log('complaintn from CARD', complaint);
  const imgLink = `http://localhost:3001/api/${complaint.complaintImage}`

  return (
    <div>
      <Card elevation={10}>
        <CardHeader
          action={
            <IconButton 
            sx={{
                size: "sm",
                bgcolor: 'green',
                boxShadow: 0.2,
                borderRadius: 2,
                p: 1.5,
                minWidth: 50,
              }}
             component={Link} to={`/complaints/${complaint.id}`} onClick={() => 
                localStorage.setItem('complaintStored', JSON.stringify(complaint))}>
                    detail
              {/* <DeleteOutlined /> */}
            </IconButton>
          }
          title={complaint.title}
        />
         <CardMedia
          component="img"
          height="100"
          image={imgLink}
          alt="screenshot"
        />
        <CardContent>
          <Typography color="textSecondary">
         { complaint.content }
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}