const express=require("express")
const {FindBlood}=require("../models/findBlood")

const findBloodRouter=express.Router()


findBloodRouter.get("/",async(req,res)=>{
    try {
        const datas=await FindBlood.find().sort({ createdAt: -1 })
        res.send({ "message": "Successfully retrieved the data from the database", data:datas});
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message:"Failed to retrieve the data" })
    }
})


findBloodRouter.post("/",async(req,res)=>{
    try {
        const findBloodData=req.body
        const requiredFields=["requested_type","name","contactNumber","bloodType","location"]
        const missingFields=requiredFields.filter(field=>!findBloodData[field])

        if(missingFields.length>0){
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }

        const newFind=new FindBlood({...findBloodData})
        await newFind.save()
        res.status(201).json({newFind})
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message:"Failed to retrieve the data" })
    }
})



module.exports={findBloodRouter}