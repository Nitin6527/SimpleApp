const express = require('express');
const router = express.Router();
const appController = require('./appControllers');


router.post('/user',appController.post_user);//create User
router.get('/user',appController.get_user);//create User
router.get('/user/:id',appController.get_userById);//create User
router.put('/user/1',appController.update_user);//create User
router.delete('/user/1',appController.delete_user);//create User











module.exports = router;