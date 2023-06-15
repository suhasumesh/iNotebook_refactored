const {validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "suhas$$grow_more"

exports.createUser = async (req,res,next)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()})
    }
//First Step:
    // User.create({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // }).then(user=>{
    //     res.json(user);
    // }).catch(err =>{
    //     console.log(err);
    //     res.json({error:'Please enter a valid credentials',message:err.message});
    // })
    try{
        let user = await User.findOne({ email: req.body.email });
        if (user) {
      return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    });
    const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      success = true;
      console.log(authToken,success);
      res.json({ success, authToken})
}catch(err){
    console.error(err.message);
    res.status(500).send("Internal Server Error");
    }
}
    
exports.login = async (req,res,next)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array()[0]);
        res.json({message:'Please enter a valid credentials',errors:errors.array()})
    }
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email})
        if(!user){
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })
    }catch(err){
        console.err(err.message);
    res.status(500).send("Internal Server Error");
    }
} 

exports.getUser = async (req, res) => { 

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
}