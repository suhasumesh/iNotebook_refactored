const express = require('express');
const {body} = require('express-validator'); 
const taskController = require('../controller/tasks');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

router.get('/fetchalltask',fetchuser,taskController.fetchalltask);

router.post('/addTask',fetchuser,[body('title','Enter a valid Title').isLength({min:3}),body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],taskController.addTask);

router.put('/updatetask/:id', fetchuser, taskController.updateTask);

router.delete('/deletetask/:id', fetchuser, taskController.delete);



module.exports = router;
