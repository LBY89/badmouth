import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import commentService from '../services/comments'
import {
    AppBar,
    Box,
    styled,
    Toolbar,
    Typography
  } from "@mui/material";
import PropTypes from 'prop-types';

import { CardMedia } from '@mui/material'

import CardContent from '@mui/material/CardContent'

import TextField from '@mui/material/TextField';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});
const ButtonStyles = {
  bgColor:{
      backgroudColor: '#f9a825'
  }
}


function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }

  Item.propTypes = {
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
    ]),
  };
const Complaint = ({user, complaint, setComplaint, handleLogout, setComplaints}) => {
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])
    console.log('comments from complaint', comments);
    
    useEffect(() => {
        console.log('effect')
        const complaintJSON = localStorage.getItem('complaintStored')
        if (complaintJSON) {
            const complaint = JSON.parse(complaintJSON)
            setComplaint(complaint)
            
            commentService
            .getAll(complaint.id)
            .then(allComments => {
              setComments(allComments)
                
            })
        }
      }, [])

      const addComment =(e) => {
        e.preventDefault()
        const newCommentObj = {
            content: newComment,
            complaintId: complaint.id 
        }
        commentService
        .create(complaint.id, newCommentObj)
        .then(returnedComment =>{
          setComments(comments.concat(returnedComment))
          
        })
        setNewComment('')
        
      }
      const handleCommentChange =(e)=> {
        setNewComment(e.target.value)
      }

    if(!complaint) {
        return null
    }
    const imgLink = `http://localhost:3001/api/${complaint.image}`
    const filteredComments = comments.filter(comment => comment.complaintId === complaint.id)

    return(
        <>
        <AppBar position="sticky">
            { user === null ?
                <StyledToolbar>
                search box 
                <Button
                style={ButtonStyles.bgColor}
                variant="fab"
                component={Link} to={'/signin'}
                >
                sign in</Button>
                <Button
                style={ButtonStyles.bgColor}
                variant="fab"
                component={Link} to={'/signup'}
                >sign up</Button>
                </StyledToolbar>

                :

                <StyledToolbar>
                search box 
                sign in and up
                {user.firstname} logged in <button onClick={handleLogout}>loggout</button>
                
                </StyledToolbar>
            }
        </AppBar>
        
        <Box sx={{minWidth: 300 }}>
          <CardMedia
            sx={{maxHeight: "60%", maxWidth: "80%", marginTop: 1, marginLeft: 2}}
            component="img"
            alt="screenshot"
            image={imgLink}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
            {complaint.title}
            </Typography>
            <Typography variant="body2" color="text.primary">
            {complaint.content}
            </Typography>
            <Typography sx={{marginTop:3}} variant="h6"> Comments</Typography>
            <Typography>
            {filteredComments.map(comment => 
              <Typography component={'span'} variant="body2" color="text.secondary" key={comment.id}>{comment.content}</Typography>
            )}
            </Typography>
          </CardContent>
            <form onSubmit={addComment}>
            <TextField
                // sx={{width: "70%", marginLeft: 2 }}
                className="form-text-input"
                margin="normal"
                required
                id="email"
                label="Add Comment"
                multiline
                value={newComment}
                onChange={handleCommentChange}
                autoFocus
              />
                <Button sx={{marginTop: 3, marginLeft: 2}} variant="outlined" type="submit">save</Button>
            </form>
          
        </Box>
         
        </>
    )
}
export default Complaint