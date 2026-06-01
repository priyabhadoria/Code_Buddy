const express = require('express') 

const userController = require('../controllers/user.controller')

const router = express()

//user auth APIs
router.post('/user/register', userController.registerUser)
router.post('/user/login', userController.loginUser)


module.exports = router;


