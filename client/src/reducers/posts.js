//initialState (of posts)-> empty Arr
//also rename 'state' to 'posts'

import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

//following is the 'postreducer' which have been exported
export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
    
        case 'END_LOADING':
        return { ...state, isLoading: false };
    
        case FETCH_ALL:
        return {
            ...state,
            posts: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages,
        };
        console.log(state.posts)
        
        case FETCH_POST:
                return { ...state, post: action.payload.post };

        case FETCH_BY_SEARCH:
            console.log('reducer: FETECH_BY_SEARCH', action.payload)
            return { ...state, posts: action.payload };

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] }; //send Arr of old and new post(s)

        case LIKE: // exact same as 'UPDATE'
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        //as need to SUBSTITUITE old (with new)
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        //omitt 'post' form posts[] if 'id' matched    

        case COMMENT:
            return {
              ...state, //keep old states
              posts: state.posts.map((post) => {
                // keep oldPost, but replce/update if (post.id==currPost.id)
                if (post._id ===action.payload._id) return action.payload
                return post;
              }),
            };

        default:
            return state;
    }
    //logic will be added later!!
}
