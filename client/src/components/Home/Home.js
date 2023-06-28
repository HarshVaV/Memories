import React from 'react'
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Form from '../Form/Form.js';
import Posts from '../Posts/Posts.js';
import Paginate from '../Paginate/Paginate.js';


//Additional-import(s) for redux

import { useEffect, useState } from 'react';
import { getPosts, getPostsBySearch } from '../../actions/posts.js'

import useStyles from './styles.js'

// Additional Import for searchBar
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

function useQuery() {
  // this user-defined function-> used as custiom-Hook
  return new URLSearchParams(useLocation().search);
  // useLocation(): url-object. Contains 'search' as one of its property
  // useLocation().search: returns query-part of URL, "?sort=price&maxPrice=100"
  // URLSearchParams(): parse queryString-> object, and provide functionality like
  //                    ... get('sort'), delete('maxPrice'), add('minPrice','50')
}

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //define state for postId and perform prop-drilling
  const [currentId, setCurrentId] = useState(0);
  const location=useLocation()
  

  // logic used by searchBar
  const query = useQuery();
  const page = query.get('page') || 1; //deafultPage=1
  const searchQuery = query.get('searchQuery');

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const searchPost = () => {
    if (search.trim() || tags.length>0) {
      console.log(search.trim(),tags)
      // dispatch(search-AsyncAction)
          // before pass, convert tags[]-> tags(commo-seprated-String)
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));

      //change URL (append searchTerm and tag as Query)
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        
    } else {
      history.push('/'); //redirect-Home, if searchForm is empty
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          {/* Left-Half */}
          <Grid item xs={12} sm={6} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          {/* Right-Half */}
          <Grid item xs={12} sm={6} md={4} >
            {/* Search-bar */}
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              {/* Search by term */}
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              {/* Search by tag */}
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              {/* Submit Btn */}
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <br />
            {/* Form */}
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <br />
            {/* Place Pagination Component */}
            {(!searchQuery && !tags.length) && (
              // for searched posts; No pagination
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home