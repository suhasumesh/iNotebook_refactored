const Task = require('../models/Task');
const {validationResult} = require('express-validator');
exports.fetchalltask = async (req,res,next)=>{ 
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

exports.addTask = async (req,res,next)=>{
    try{
        const {title,description,tag}= req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const task = new Task({title, description, tag, user: req.user.id});
        const savedtask = await task.save();
            console.log(savedtask);
            res.json(savedtask);
            
        }catch(err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }

exports.updateTask = async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            // Create a newNote object
            const newTask = {};
            if (title) { newTask.title = title }; 
            if (description) { newTask.description = description };
            if (tag) { newTask.tag = tag };
    
            // Find the note to be updated and update it
            let task = await Task.findById(req.params.id);
            if (!task) { return res.status(404).send("Not Found") }
    
            if (task.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
            res.json({ task });
        } catch (error) {
            console.error(error.message);
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    
exports.delete = async (req, res) => {
        try {
            // Find the task to be delete and delete it
            let task = await Task.findById(req.params.id);
            if (!task) { return res.status(404).send("Not Found") }
    
            // Allow deletion only if user owns this Note/Task
            if (task.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
    
            task = await Task.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Task has been deleted", task: task });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }