// import complaintService from '../services/complaints'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useState } from 'react'
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

const EditComplaint=({display, setDisplay, id, updateComplaint, complaint})=> {
  const [title, setTitle] = useState(complaint.title)
  const [content, setContent] = useState(complaint.content)
  if(!display){
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
    updateComplaint({id, title, content})
    setDisplay(false)
  }

  return(
    <div>
      <form onSubmit={editForm}>
      <TextField
          className="form-text-input"
          sx={{width: "100%", maxWidth: 500}}
          margin="normal"
          onChange={handleTitle}
          value={title}
          label={"title..."} //optional
        />
        <TextField
          className="form-text-input"
          sx={{width: "100%", maxWidth: 500}}
          margin="normal"
          multiline
          onChange={handleContent}
          value={content}
          label={"content..."} //optional
        />
        <Button type="submit" >save</Button>
        </form>
    </div>
  )
}
const Complaint = ({user, updateComplaint, complaint, handleLogout, deleteSingleComplaint}) => {
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])
    const [editForm, setEditForm] = useState(false)
  
    // useEffect(() => {
    //     console.log('effect')
    //     const complaintJSON = localStorage.getItem('complaintStored')
    //     if (complaintJSON) {
    //         const complaint = JSON.parse(complaintJSON)
    //         setComplaint(complaint)
            
    //         commentService
    //         .getComplaintComments(complaint.id)
    //         .then(allComments => {
    //           setComments(allComments)
                
    //         })
    //     }
    //   }, [])

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

    // const handleUpdateComplaint = () {

    // }

    if(!complaint) {
        return null
    }
    const imgLink = `http://localhost:3001/api/${complaint.image}`
    // const filteredComments = complaint.comments.filter(comment => comment.complaintId === complaint.id)
    // console.log('user', user);
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
            {user.id === complaint.user.id ? 


            <><Button onClick={() =>setEditForm(true)}>Edit</Button>


            <Button onClick={() => deleteSingleComplaint(complaint.id)}>Delete</Button></>
            : null}
            <Typography sx={{marginTop:3}} variant="h6"> Comments</Typography>
            <Typography>
            {complaint.comments.map(comment => 
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
        <EditComplaint display={editForm} setDisplay={setEditForm} id={complaint.id} updateComplaint={updateComplaint} complaint={complaint}/> 
        </>
    )
}
export default Complaint