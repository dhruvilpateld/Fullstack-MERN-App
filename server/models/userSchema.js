const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const Note=mongoose.model("NOTE",userSchema);

module.exports=Note;