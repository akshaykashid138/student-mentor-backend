const mongoose =require('mongoose')

const mentorSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    students:[]
})

module.exports=mongoose.model('Mentor',mentorSchema)