import express from 'express';
import  API_CALL  from '../controller/posts';

let router= express.Router(); 


router.get('/get-posts',API_CALL.getPosts);
router.get(`/get_post/:id`, API_CALL.getPost);
export = router;