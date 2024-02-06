const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router
  .get('/user', userController.getAllUsers)
  .get('/user/:id', userController.getUser)
  .put('/user/:id', userController.replaceUser)
  .patch('/user/:id', userController.updateUser)
  .delete('/user/:id', userController.deleteUser);

exports.router = router;  
