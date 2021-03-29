const express=require("express")

const router=express.Router()
const Mentor=require('../models/mentor')
const Student=require('../models/student')

//getting all mentors to database
router.get("/",async (req,res)=>{

    try{
        let data=await Mentor.find()
        res.status(200).send(data) 
    }
    catch(error){
        console.log(error)
    }   
})

//adding mentor to database
router.post("/createMentor",async (req,res)=>{
    try{
        let mentor= await Mentor.findOne({ email: req.body.email } )
        if(mentor){
            return res.json({messgae:"mentor already present"})
        }
        mentor=await Mentor(req.body);
        mentor.save()
        res.status(200).json({message:"mentor created"})
    }
    catch(error){
        console.log(error)
    }
})


//assigning students to the mentor
router.put('/:id/addStudents',async (req,res)=>{
    try{

        // getting student info
        let student= await Student.findOne({ email: req.body.email } )
        if(!student) return res.json({message:"student not found"})
        

        //check student is present or not in Mentors list
        let record= await Mentor.findOne({"students.email": req.body.email } )
        if(record) return res.json({message:"student is already assigned to mentor"})

        await Mentor.findOneAndUpdate({_id:req.params.id},{$push:{students:student}})
        res.status(200).json({message:"students added"})
    }
    catch(error){
        console.log(error)
    }
})

//showing students of mentor
router.get('/:id/students',async (req,res)=>{
   let mentor=await Mentor.findOne({_id:req.params.id})
    if(!mentor) return res.json({message:"Mentor not found"})

    return res.json(mentor.students)
})

module.exports=router
