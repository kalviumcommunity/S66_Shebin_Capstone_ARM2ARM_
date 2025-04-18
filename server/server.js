const express=require("express")
const mongoose=require("mongoose")
require("dotenv").config()
const cors=require("cors")
const {userRouter}=require("./routes/user.route")
const {requestRouter}=require("./routes/bloodRequest.route")
const {findBloodRouter}=require("./routes/FindBlood.route")


const app=express()
app.use(express.json())
app.use(cors())

let connection=mongoose.connect(process.env.mongoURL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(()=> console.log("Failed to connect to MongoDB:", error.message))


app.use("/user",userRouter)
app.use("/BloodRequest",requestRouter)
app.use("/findBlood",findBloodRouter)



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on  http://localhost:${process.env.PORT}`)
})
