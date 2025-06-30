const mongoose = require("mongoose")

const donationCampSchema=new mongoose.Schema({
    requested_type:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    organization:{
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    location:{
        type: String,
        required:true
    },
    contactNumber:{
        type: Number,
        required: true
    },
})

const DonationCamps=mongoose.model("Donation-Camps",donationCampSchema)
module.exports={DonationCamps}