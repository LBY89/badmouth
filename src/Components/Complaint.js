import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import commentService from '../services/comments'

const Complaint = (props) => {
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState([])
    const { complaint, setComplaint } = props
    
    // const complaint = props.complaint
    console.log('complaint from parent component', complaint)
    //!!!refresh losing complaint object, very common difficulty
    useEffect(() => {
        console.log('effect')
        
        const complaintJSON = localStorage.getItem('complaintStored')
        if (complaintJSON) {
            const complaint = JSON.parse(complaintJSON)
            setComplaint(complaint)
        }

        // commentService
        //   .getAll()
        //   .then(allComments => {
        //     console.log('promise fulfilled')
        //     setComments(allComments)
        //   })
        
      }, [])
      const addComment =(e) => {

        e.preventDefault()
        const newCommentObj = {
            content: newComment,
            id: comments.length +1 
        }
        commentService
        .create(newCommentObj)
        .then(response => {
            setComments(comments.concat(newCommentObj))
            setNewComment('')
        })
        
      }


      const handleCommentChange =(e)=> {
        setNewComment(e.target.value)
      }

    // if(!complaint) {
    //     return null
    // }
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
        <div>{complaint ?  complaint.content : ''}</div>
        <div>
            <form onSubmit={addComment}>
                <input value={newComment} onChange={handleCommentChange}/>
                <button type="submit">save</button>
            </form> 
        </div>
        {/* {comments.map(comment => 
            <p key={comment.id}>{comment.content}</p>
        )} */}
        </div>
        
    )
}

export default Complaint