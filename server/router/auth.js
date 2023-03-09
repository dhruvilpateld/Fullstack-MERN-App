const express=require('express');
const router=express.Router();

require('../db/conn');
const Note=require('../models/userSchema');

router.get('/note-list',async(req,res)=>{
    const NoteList=await Note.find({})
    try{
        res.status(200).json(NoteList)
    }catch(err){
        res.status(500).json({
            status:"Failed",
            message:err
        })
    }
})

// router.patch('/update-note/:id',async(req,res)=>{
//     const updateNote= await Note.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,
//         runValidators:true,
//         context: 'query'
//     })
//     try{
//         res.status(200).json({
//             status:"Success",
//             data:{
//                 updateNote
//             }
//         })
//     }catch(err){
//         console.log(err);
//     }
// })

router.post('/add-note',async(req,res)=>{
    const {title,content}= req.body;
    if(!title || !content){
        return res.status(422).json({message:"please enter valid information"});
    }
    const NoteContent=new Note({title,content});
    await NoteContent.save().then(()=>{
        res.json(NoteContent)
    })
})

router.delete('/delete-note/:id',async(req,res)=>{
    const result=await Note.findByIdAndDelete(req.params.id)

    res.json({result});
})

module.exports=router;