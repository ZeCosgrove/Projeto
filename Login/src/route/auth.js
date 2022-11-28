const router = require('express').Router()
var authController = require('../controller/auth');

router.route('/login')
     .post(authController.login);

router.route('/logout')
     .post(authController.logout);

router.route('/register')
     .post(authController.register);

router.route('/getPassword')
     .post(authController.getPassword);