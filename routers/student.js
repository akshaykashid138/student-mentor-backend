const express=require("express")
const router=express.Router()
const mongoose =require('mongoose')
const Student=require('../models/student')
const Mentor=require('../models/mentor')
const student = require("../models/student")



//getting all student to database
router.get("/",async (req,res)=>{

    try{
        let data=await Student.find()
        res.status(200).send(data)
    }
    catch(error){
        console.log(error)
    }   
})

//adding student to database
router.post("/createStudent",async (req,res)=>{
    try{
        let student= await Student.findOne({ email: req.body.email } )
        if(student){
            return res.json({message:"student already present"})
        }
        student=await Student(req.body);
        student.save()
        res.status(200).json({message:"student created"})
    }
    catch(error){
        console.log(error)
    }
})

//getting all student to database
router.get("/mentors",async (req,res)=>{

    try{
       
        let data=await Mentor.find().toArray();
        res.status(200).send(data)
       
    }
    catch(error){
        console.log(error)
    }   
})


//Assign or update mentor for a particular student
router.put("/:id/assignMentor", async (req,res)=>{
    
    try{    
        console.log("id...",(req.params.id))
        let student= await Mentor.find({"students._id":mongoose.Types.ObjectId( req.params.id)}  )
        
        
        if(!student) res.status(404).json({message:"student not found"})
        
        
        let mentor={
            _id:student[0]._id,    
            name:student[0].name,
            gmail:student[0].email
        }
       
        
        let result=await Student.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.id)},{$set:{mentor:mentor}})
        res.status(200).json({message:"mentor assigned",result})

    }
    catch(error){
        console.log(error)
    }
})


module.exports=router