const mongoose=require("mongoose")
const { default: BloodTypeEnums } = require("../enums/blood")

const donateSchema=new mongoose.Schema({
    requested_type:{
        type: String,
        required: true,
    },
    
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



},{ timestamps: true })

const Donate=mongoose.model("Donat",donateSchema)
module.exports={FindBlood}