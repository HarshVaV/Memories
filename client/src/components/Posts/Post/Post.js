import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
//import Icons
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment' //used to get createDate of Post
import { useDispatch } from 'react-redux';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';


// import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

// for deatilsPage
import { useHistory } from 'react-router-dom';


const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  // logic to navigate to detailsPage
  const history = useHistory()
  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  const deleteCurrPost = () => {
    //dispatch delete-ActionCreator
    dispatch(deletePost(post._id))
  }



  //likeBtn function
      const [likes, setLikes] = useState(post?.likes); //post: passedProps
      const userId = user?.sub || user?._id;
      const hasLikedPost = post.likes.find((like) => like === userId);
      
      const likeCurrPost = () => {
        //dispatch like-ActionCreator: delayed(backEnd+FrontEnd) updation
            dispatch(likePost(post._id))

        //instant frontEnd-updaation
            if (hasLikedPost) {
              setLikes(post.likes.filter((id) => id !== userId)); //un-like
              console.log('un-liked',Date())
            } else {
              setLikes([...post.likes, userId]); //like
              console.log('liked',Date())
            }

      }



  //likeBtn looks
  // to calculate-Likes and perform conditional rendering on liketn
        // NOTE: use likes-state (provided via useState()). Don't use post.likes (provided via props)
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (user?.sub || user?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }



    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={classes.card} raised elevation={6}>

      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {/*  conditional rendering of Edit Button */}
      {post.creator === user?._id || post.creator === user?.sub ?
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
        </div>
        : null
      }
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        {/* tags */}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {/* use map(), add '#' before each tag */}
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>

      </ButtonBase>
      {/* like-delete bnt(s) */}
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={likeCurrPost}>
          {Likes()}
        </Button>

        {/* conditional rendering of deleteBtn */}
        {post.creator === user?._id || post.creator === user?.sub ?
          <Button size="small" color="primary" onClick={deleteCurrPost} >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
          : null
        }
      </CardActions>
    </Card>
  );
};

export default Post;