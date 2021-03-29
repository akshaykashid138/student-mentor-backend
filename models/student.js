const mongoose =require('mongoose')

const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mentor:{}
    // mentor:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Mentor'
    // }
})

module.exports=mongoose.model('Student',studentSchema)