import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem('profile'));// track user for newCommt
  const [comment, setComment] = useState(''); // for newComment
  const [comments, setComments] = useState(post?.comments); //old comments[]
  const dispatch = useDispatch();
  const history = useHistory()

  // for newCommt 
  const commentsRef = useRef() //to create reference-Component
  const handleComment = async () => {
    const finalComment = `${user.name}: ${comment}`; //string= "user: commnent"
    const newComments = await dispatch(commentPost(finalComment, post._id));

    //update commnets[] and commnet-> to re-render the componet
    setComment('')
    setComments(newComments)
    // newComments= updated-comments[] returned by ACTION-CREATOR
    // tweek to make sure actionCreator retunrs updatedComments[]

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    //using useRef and name-of-referenceDiv, smoothly-scroll to it


  };



  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        {/* constional-render of comment[ ], based on size */}
        {post.comments.length > 0 ? (
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">Comments</Typography>

            {/* Commnet-List */}
            {comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(': ')[0]}</strong>
                {c.split(':')[1]}
              </Typography>
            ))}
            {/*  An-EMPTY  Reference 'div'. It always lie below LAST-Comment */}
            <div ref={commentsRef} />
          </div>

        ) : (<Typography variant="body1" color="textSecondary"><strong>Be the First One to leave a Comment!! 💬</strong></Typography>)}

        {/* newComment Form -> conditional render, if(userLogger)*/}
        {user?.name ? (
          <div style={{ width: '100%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
            <br />
            {/* add comment btn, if(len>0) */}
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
              Comment
            </Button>
          </div>
        ) : (<Typography variant="body1" color="primary"><strong>Log-in to leave comment!!</strong></Typography>)}

      </div>
    </div>
  );
};

export default CommentSection;