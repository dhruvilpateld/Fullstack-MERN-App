const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');

app.use(cors())
dotenv.config({path:'./config.env'});
require('./db/conn');
app.use(express.json())
app.use(require('./router/auth'))
const Note=require('./models/userSchema');
const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})