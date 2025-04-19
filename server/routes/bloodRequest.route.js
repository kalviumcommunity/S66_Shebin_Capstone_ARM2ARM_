const express=require("express")
const {BloodRequest}=require("../models/bloodRequestSchema")
const mongoose=require("mongoose")

let requestRouter=express.Router()


requestRouter.get("/",async(req,res)=>{
    try {

        const requests=await BloodRequest.find().sort({ createdAt: -1 })
        res.send({ "message": "Successfully retrieved the data from the database", data:requests});
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message:"Failed to retrieve the data" })
    }
})

requestRouter.post("/",async(req,res)=>{
    try {
        const requestData=req.body
        const requiredFields = ["requested_type", "name","contactNumber", "bloodType", "location", "units", "status"];
        const missingFields = requiredFields.filter(field => !requestData[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }
        const newRequest = new BloodRequest({
            ...requestData,
        });

        await newRequest.save()
        res.status(201).json({message:"Request added successfully!",newRequest})

    } catch (error) {
        console.error(error); 
        res.status(500).send({ message:"Failed to retrieve the data" })
    }
})

requestRouter.put("/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const {requested_type, name,contactNumber,bloodType,location,units,status}=req.body

        const updatedRequest=await BloodRequest.findByIdAndUpdate(id,{requested_type, name,contactNumber,bloodType,location,units,status},{ new: true })

        if (!updatedRequest) {
            return res.status(404).json({ error: "Entry not found." });
        }

        res.json({ message: "Updated successfully",updatedRequest})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during update" });  
    }
})

requestRouter.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const deleteRequest=await BloodRequest.findByIdAndDelete(id)

        if (!deleteRequest) {
            return res.status(404).json({ error: "Request not found" });
        }

        res.json({ message: "Donor deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during delete" });
    }
})







module.exports={requestRouter}
