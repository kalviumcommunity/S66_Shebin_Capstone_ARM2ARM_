const express=require("express")
const DbConnection =require("./db/dbConnection")
require("dotenv").config()
const cors=require("cors")
const {userRouter}=require("./routes/user.route")
const {requestRouter}=require("./routes/bloodRequest.route")
const {findBloodRouter}=require("./routes/FindBlood.route")
const {donationCampRouter}=require("./routes/donationCamp.route")
const {smsRouter}=require("./routes/sendSmsRoute")
const {smsRouter}=require("./routes/sendSmsRoute")
const {donationCampRouter}=require("./routes/donationCamp.route")


const app=express()
app.use(express.json())
app.use(cors())

DbConnection()


app.use("/user",userRouter)
app.use("/BloodRequest",requestRouter)
app.use("/findBlood",findBloodRouter)
app.use("/DonationCamps",donationCampRouter)
app.use("/api",smsRouter)
app.use("/api",smsRouter)
app.use("/DonationCamps",donationCampRouter)




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on  http://localhost:${process.env.PORT}`)
})
