import axios from 'axios'

//base-url
const API = axios.create({ baseURL: 'http://localhost:2000' }); 

//interceptors: similar to app.use(). Get executed for every request
API.interceptors.request.use((req) => {
    // add token to every-file
    if (localStorage.getItem('profile')) {
        // use following to distinguish custom and google token
      let prefix='Bearer'
      if(JSON.parse(localStorage.getItem('profile')).googleToken)  prefix= 'Google'
       
      
        // use below BOILERPLATE code to add-tokenHeader
      req.headers.Authorization = `${prefix} ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

//NOTE: following are fuctions with NO-returnValue. Only additonal-passed-parameter(s) (if any) is send to corresp. 'url-Route'
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
    // export const fetchPostsBySearch = (searchQuery) => API.get(`/posts`);
    export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
    export const createPost = (newPost) => API.post('/posts', newPost);
    export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
    export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
    export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
        //updatedPost: it's the updated data-OBJECT (taken from client-form)
    export const deletePost = (id) => API.delete(`/posts/${id}`);
// auth-routes
    export const signIn = (formData) => API.post('/user/signin', formData);
    export const signUp = (formData) => API.post('/user/signup', formData);
//fectch env variable
    
    export  const client=()=>axios.get('http://localhost:2000/env/clientid')