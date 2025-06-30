const express=require("express")
const {DonationCamps}=require("../models/camps")

const donationCampRouter=express.Router()

donationCampRouter.post("/",async(req,res)=>{
    try {
        const campData=req.body
        const requiredFields = ["requested_type", "name","organization", "startDate","endDate","startTime","endTime", "location","contactNumber"]
        const missingFields = requiredFields.filter(field => !campData[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }
        const newCamp = new DonationCamps({...campData});
        await newCamp.save();
        res.status(201).json(newCamp);
    } catch (error) {
        res.status(400).json({ error: "Failed to create camp", details: error.message });
    }
})

donationCampRouter.get("/",async(req,res)=>{
    try {
        const camps = await DonationCamps.find();
        res.status(200).json({ "message": "Successfully retrieved the data from the database", data:camps});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch camps" });
    }
})

donationCampRouter.get("/:id",async(req,res)=>{
    try {
        const camp = await DonationCamps.findById(req.params.id);
        if (!camp) {
            return res.status(404).json({ error: "Camp not found" });
        }
        res.status(200).json(camp);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid ID format" });
    }
})

donationCampRouter.put("/:id", async (req, res) => {
    try {
        const updatedCamp = await DonationCamps.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true,});
        if (!updatedCamp) {
            return res.status(404).json({ error: "Camp not found" });
        }
        res.status(200).json({ message: "Updated successfully",updatedCamp});
    } catch (error) {
        res.status(400).json({ error: "Failed to update camp", details: error.message });
    }
});

donationCampRouter.delete("/:id", async (req, res) => {
    try {
        const {id}=req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const deletedCamp = await DonationCamps.findByIdAndDelete(id);
        if (!deletedCamp) {
            return res.status(404).json({ error: "Camp not found" });
        }
        res.status(200).json({ message: "Camp deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Failed to delete camp" });
    }
});

module.exports={donationCampRouter}