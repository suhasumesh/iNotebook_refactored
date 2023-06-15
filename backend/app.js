const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();
const app = express();
const taskRoute = require('./Routes/task');
const authRoute = require('./Routes/auth');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoute);
app.use('/api/tasks',taskRoute);

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: "true",
useUnifiedTopology: "true"}).then(()=>{
    app.listen(5000,()=>{
        console.log("Backend Listening at Port 5000");
        console.log("Connected to Db");
    })
})
