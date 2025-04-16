    const mongoose=require("mongoose")
    const { default: BloodTypeEnums } = require("../enums/blood")

    const findBloodSchema=new mongoose.Schema({
        requested_type:{
            type: String,
            required: true,
            enum: ["Donor", "Blood-Banks"]
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
        }



    },{ timestamps: true })

    const FindBlood=mongoose.model("Find-Blood",findBloodSchema)
    module.exports={FindBlood}