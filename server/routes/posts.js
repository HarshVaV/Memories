import express from 'express'
import { getPost,createPost, deletePost, getPosts, getPostsBySearch,  updatePost,likePost, commentPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router=express.Router();

// Add auth-middleware
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);

router.post('/',auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router; 

