const express=require("express")
const mongoose =require('mongoose')
const cors =require("cors")
const studnetRouter=require('./routers/student')
const mentorRouter=require('./routers/mentor')
const dotenv= require('dotenv')

dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true },{ useUnifiedTopology: true })
        .then(()=> console.log("connected to database successfully"))
        .catch((err)=> console.log(err))


//x3SNoM3mvIxJlxah

//routes
app.use('/api/students',studnetRouter)
app.use('/api/mentors',mentorRouter)


const PORT=process.env.PORT
//
app.listen(PORT,()=>console.log("server started"))

