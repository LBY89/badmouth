import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import commentService from '../services/comments'
import {
    AppBar,
    Box,
    styled,
    Stack,
    Toolbar,
    Typography
  } from "@mui/material";
import PropTypes from 'prop-types';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import complaintService from '../services/complaints'

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
    
         <Box
            sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            }}
            >
            <Item flex={4}>
            <h2>{complaint ?  complaint.content : ''}</h2>
            {filteredComments.map(comment => 
                <p key={comment.id}>{comment.content}</p>
            )}
            <form onSubmit={addComment}>
                <input value={newComment} onChange={handleCommentChange}/>
                <button type="submit">save</button>
            </form> 
            </Item>
            <Item flex={1}> 
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={1}
                >
            </Stack>
            </Item>
        </Box>
        </>
    )
}
export default Complaint