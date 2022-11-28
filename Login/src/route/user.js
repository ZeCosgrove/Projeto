const router = require('express').Router()
var userController = require('../controllers/user');

router.route('/')
     .get(userController.getUser);

router.route('/:id')
     .get(userController.getUsers);

router.route('/')
     .post(userController.createUser);

router.route('/register')
     .put(userController.updateUser);

router.route('/getPassword')
     .post(userController.DeleteUser);