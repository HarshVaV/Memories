import React from 'react'
import { useSelector } from 'react-redux'

import Post from './Post/Post'
import useStyles from './styles' 
import { Grid,CircularProgress } from '@material-ui/core'

const Posts=({setCurrentId})=>{
    const classes=useStyles();
    //via useSelcetor redux-Hook, getPost
    const {posts, isLoading}=useSelector((state)=>state.posts)
        // NOTE: 
        //      there is 2 subStore in reduxStore:{posts, auth}. 
        //      in store.posts: {isLoading, posts[], currentPage, numberofPages}

    if (!posts.length && !isLoading) return 'No posts';
    
    return (
        // conditional rendering. Fetching take time, upto that time, "<CircluarProgress/>" will be rendered
        isLoading ? <CircularProgress/>:(
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post)=>(
                    <Grid key={post._id} item md={6} xs={12} lg={4} xl={3}>
                        {/* send individual-Post as porp to child-componet */}
                        {/* NOTE: indi-Post is parameter of map(), hence can to directly pass */}
                        <Post post={post} setCurrentId={setCurrentId} />

                    </Grid>
                ))}

            </Grid>
        )
    );
}

export default Posts;
