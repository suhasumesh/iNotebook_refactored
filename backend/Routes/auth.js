const express = require('express');
const {body,validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const authController = require('../controller/auth');

const router = express.Router();

router.post('/createuser',[body('name','Please enter a valid name').isLength({min:5}),body('email','Please enter a valid email').isEmail(),body('password','Plese enter a valid password').isLength({min:7})],authController.createUser);

router.post('/login',[body('email','Please enter correct email').isEmail(),body('password','Please enter a valid password').exists()],authController.login);

router.post('/getuser', fetchuser,authController.getUser);

module.exports = router;
