//import everything from 'api'
import * as api from '../api';
import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE,COMMENT } from '../constants/actionTypes';

//define async actionCreators using thunk-logic
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log('ationCreator API-req sendend')
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
    console.log('ationCreator API-req recieved', Date())
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


// async actionCreators getPost (by id)
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);
    console.log(data)
    dispatch({ type: FETCH_POST, payload: { post: data } });

    dispatch({ type: END_LOADING });    
  } catch (error) {
    console.log(error);
  }
};

// async actionCreator searched Post
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  // searchQuery-obj()= {searchTerm, searchTags}
  try {
    dispatch({ type: START_LOADING }); // to start loading animation
    const { data } = await api.fetchPostsBySearch(searchQuery);
    console.log(data)
    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    dispatch({ type: END_LOADING }); // to stop loading animation
  } catch (error) {
    console.log(error);
  }
};

//async createPost action-Creator
export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data })

    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error.message)
  }
}

//async updatePost action-Creator
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

//async deletePost action-Creator
export const deletePost = (id) => async (dispatch) => {
  console.log('Deletion Tried')
  try {
    await api.deletePost(id); //don't store anything. As messageObject will be send from backEnd
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
}

//async likePost action-Creator
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    console.log(data)
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// async actionCreator to postCommnent
export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
      // this will be then used by setCommnets() in <CommentSection/>: to upadate commnets[]
  } catch (error) {
    console.log(error);
  }
};
