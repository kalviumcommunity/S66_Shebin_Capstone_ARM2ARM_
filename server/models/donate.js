const mongoose=require("mongoose")
const { default: BloodTypeEnums } = require("../enums/blood")
const { type } = require("os")

const donateSchema=new mongoose.Schema({
    // requested_type:{
    //     type: String,
    //     required: true,
    //     enum: ["Hospital", "Blood-Banks"]
    // },
    
    name:{
        type: String,
        required: true,
    },

    contactNumber:{
        type: Number,
        required: true
    },
    
    bloodType:{
        type: String,
        required: true,
        enum: BloodTypeEnums,
    },
    location:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        required: true,
    }




},{ timestamps: true })

const Donate=mongoose.model("Donate",donateSchema)
module.exports={Donate}