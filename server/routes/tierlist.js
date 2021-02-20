  
import express from 'express';

import { getPosts, getPost, createPost, updatePost,  deletePost, findMatch, sendVote } from '../controllers/tierlist.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getPosts);
router.get('/:id/find', findMatch);
router.post('/', auth,  createPost);
router.delete('/:id', auth, deletePost);
router.patch('/:id', auth, updatePost);
router.patch('/:first/:second/:id', auth, sendVote);
export default router;