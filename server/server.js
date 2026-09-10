const express=require("express")
const path=require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })
const DbConnection =require("./db/dbConnection")
const cors=require("cors")
const {userRouter}=require("./routes/user.route")
const {requestRouter}=require("./routes/bloodRequest.route")
const {findBloodRouter}=require("./routes/FindBlood.route")
const {donationCampRouter}=require("./routes/donationCamp.route")
const {smsRouter}=require("./routes/sendSmsRoute")


const app=express()
app.use(express.json())
app.use(cors())

DbConnection()


app.use("/user",userRouter)
app.use("/BloodRequest",requestRouter)
app.use("/findBlood",findBloodRouter)
app.use("/donationCamps",donationCampRouter)
app.use("/api",smsRouter)




const PORT = process.env.PORT || 9000

app.listen(PORT,()=>{
    console.log(`Server is running on  http://localhost:${PORT}`)
})
