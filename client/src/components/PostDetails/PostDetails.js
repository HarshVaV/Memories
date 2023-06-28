import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import CommentSection from './CommentSection';



const Post = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams(); 

    //dispact(AsyncAction())
    useEffect(() => {
        dispatch(getPost(id));
        console.log('getPost dispatched from PostDetails-component')
    }, [id]);// update <PostDeatils/> whenever 'id' in URL changes

    // fetch(post), whose tags==currPost-tags
    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
            console.log('getPostBySearch dispatched from PostDetails-component')
        }
    }, [post]);// reload recommdPost-section, if changes made in currPost

    //make recommdPost clickable
    const openPost = (_id) => history.push(`/posts/${_id}`);


    if (!post) return null;




    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        isLoading ?
            //Intermeddiate loading state, so that asynAction of fectPost can get sufficient time
            (<Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>)
            : (
                <Paper  className={classes.detailPaper} elevation={6}>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <Typography variant="h4" component="h2" >{post.title}</Typography>
                            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                            <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                            <Typography variant="h6">Created by: {post.name}</Typography>
                            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                            <Divider style={{ margin: '20px 0' }} />
                            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                            <Divider style={{ margin: '20px 0' }} />
                                {/*commnetSection*/}
                                <CommentSection post={post} />
                            <Divider style={{ margin: '20px 0' }} />
                        </div>
                        <div className={classes.imageSection}>
                            <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                        </div>
                    </div>
                    {!!recommendedPosts.length && (

                        //   render recommdPost-section iff cnt(Post)!=0
                        <div className={classes.section}>
                            <Typography gutterBottom variant="h5">You might also like:</Typography>
                            <Divider />
                            <div className={classes.recommendedPosts}>
                                {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                                    <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                        <Typography gutterBottom variant="h6">{title}</Typography>
                                        <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                        <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                        <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                        <img src={selectedFile} width="200px" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Paper>

            )
    );
};

export default Post;